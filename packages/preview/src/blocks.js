// Finds GitBook's `{% name … %} … {% endname %}` blocks in a page and returns them as a tree.
// The blocks always sit on lines of their own. Lines inside a code fence are never read as blocks,
// so a `{% … %}` shown in a code sample stays text.

const BLOCK_LINE = /^([ \t]*)\{%-?\s*(end)?([a-z][a-z0-9-]*)(.*?)\s*-?%\}[ \t]*$/;
const FENCE_OPEN = /^[ \t]*(`{3,}|~{3,})(.*)$/;
const FENCE_CLOSE = /^[ \t]*(`{3,}|~{3,})[ \t]*$/;

// Blocks GitBook writes both with and without an end tag.
const OPTIONAL_END = new Set(['embed', 'file', 'include']);

export function parseAttributes(text) {
  const attrs = {};
  const re = /([a-zA-Z_][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"']+))|"([^"]*)"|'([^']*)'/g;
  let m;
  while ((m = re.exec(text))) {
    if (m[1]) {
      attrs[m[1]] = m[2] ?? m[3] ?? m[4];
    } else {
      attrs._ = m[5] ?? m[6];
    }
  }
  return attrs;
}

function tokenize(lines, firstLine) {
  const tokens = [];
  let fence = null;
  lines.forEach((line, i) => {
    const lineNo = firstLine + i;
    if (fence) {
      const close = line.match(FENCE_CLOSE);
      if (close && close[1][0] === fence.char && close[1].length >= fence.length) {
        fence = null;
      }
      tokens.push({ kind: 'text', line, lineNo });
      return;
    }
    const open = line.match(FENCE_OPEN);
    if (open && !(open[1][0] === '`' && open[2].includes('`'))) {
      fence = { char: open[1][0], length: open[1].length };
      tokens.push({ kind: 'text', line, lineNo });
      return;
    }
    const block = line.match(BLOCK_LINE);
    if (block) {
      tokens.push({
        kind: block[2] ? 'close' : 'open',
        name: block[3],
        attrs: block[2] ? {} : parseAttributes(block[4]),
        indent: block[1],
        lineNo,
      });
      return;
    }
    tokens.push({ kind: 'text', line, lineNo });
  });
  return tokens;
}

// An optional-end block has an end tag when the next block line is its own end tag.
function hasEndTag(tokens, from, name) {
  for (let j = from + 1; j < tokens.length; j += 1) {
    const t = tokens[j];
    if (t.kind === 'close') {
      return t.name === name;
    }
    if (t.kind === 'open') {
      return false;
    }
  }
  return false;
}

// Returns { root, problems }. Each node is either
//   { type: 'text', lines, lineNo }  or
//   { type: 'block', name, attrs, indent, lineNo, children }.
export function parseBlocks(source, firstLine = 1) {
  const tokens = tokenize(source.split('\n'), firstLine);
  const problems = [];
  const root = { type: 'root', children: [] };
  const stack = [root];
  const top = () => stack[stack.length - 1];

  tokens.forEach((t, i) => {
    if (t.kind === 'text') {
      const siblings = top().children;
      const last = siblings[siblings.length - 1];
      if (last && last.type === 'text') {
        last.lines.push(t.line);
      } else {
        siblings.push({ type: 'text', lines: [t.line], lineNo: t.lineNo });
      }
      return;
    }
    if (t.kind === 'open') {
      const node = { type: 'block', name: t.name, attrs: t.attrs, indent: t.indent, lineNo: t.lineNo, children: [] };
      top().children.push(node);
      if (OPTIONAL_END.has(t.name) && !hasEndTag(tokens, i, t.name)) {
        node.leaf = true;
      } else {
        stack.push(node);
      }
      return;
    }
    let at = -1;
    for (let s = stack.length - 1; s > 0; s -= 1) {
      if (stack[s].name === t.name) {
        at = s;
        break;
      }
    }
    if (at < 0) {
      problems.push({ type: 'stray-end', line: t.lineNo, message: `{% end${t.name} %} closes nothing` });
      return;
    }
    while (stack.length - 1 > at) {
      const open = stack.pop();
      problems.push({ type: 'unclosed-block', line: open.lineNo, message: `{% ${open.name} %} has no {% end${open.name} %}` });
    }
    stack.pop();
  });

  while (stack.length > 1) {
    const open = stack.pop();
    problems.push({ type: 'unclosed-block', line: open.lineNo, message: `{% ${open.name} %} has no {% end${open.name} %}` });
  }
  return { root, problems };
}

// The text of a block's children, for blocks whose body is a single link or a caption.
export function childText(node) {
  return node.children
    .map((child) => (child.type === 'text' ? child.lines.join('\n') : ''))
    .join('\n')
    .trim();
}
