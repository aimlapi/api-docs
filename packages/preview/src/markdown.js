// The Markdown renderer: CommonMark + tables + footnotes, plus GitBook's code blocks, heading anchors and links.
// Every render gets `env.ctx` (see page.js), which resolves links and collects problems.

import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import hljs from 'highlight.js';
import { escapeHtml, ICONS } from './html.js';

const LANGUAGE_ALIASES = {
  json5: 'json',
  jsonc: 'json',
  shell: 'bash',
  sh: 'bash',
  zsh: 'bash',
  console: 'bash',
  curl: 'bash',
  py: 'python',
  js: 'javascript',
  ts: 'typescript',
  yml: 'yaml',
  'c#': 'csharp',
  cs: 'csharp',
  golang: 'go',
};

export function highlight(code, lang) {
  const language = LANGUAGE_ALIASES[lang] || lang;
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  }
  return escapeHtml(code);
}

// Splits highlighted HTML into lines, closing and reopening the spans a line break falls inside.
export function splitLines(html) {
  const lines = [];
  const open = [];
  let line = '';
  const re = /(<span[^>]*>)|(<\/span>)|(\n)|([^<\n]+|<)/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[1]) {
      open.push(m[1]);
      line += m[1];
    } else if (m[2]) {
      open.pop();
      line += m[2];
    } else if (m[3]) {
      lines.push(line + '</span>'.repeat(open.length));
      line = open.join('');
    } else {
      line += m[4];
    }
  }
  lines.push(line);
  return lines;
}

export function renderCode(code, lang) {
  // Lines are block elements, so they are joined without "\n" (inside <pre> it would add a blank line).
  const body = splitLines(highlight(code.replace(/\n$/, ''), lang))
    .map((l) => `<span class="line">${l}</span>`)
    .join('');
  const language = lang ? ` language-${escapeHtml(lang)}` : '';
  return (
    `<div class="code"><button type="button" class="code-copy" title="Copy" aria-label="Copy">${ICONS.copy}</button>` +
    `<pre><code class="hljs${language}">${body}</code></pre></div>\n`
  );
}

export function headingSlug(text) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-{2,}/g, '-') || 'section'
  );
}

const EMPTY_ANCHOR_OPEN = /^<a\b[^>]*\bid="([^"]+)"[^>]*>$/i;

// Gives every heading an id (GitBook writes custom ones as `## Title <a href="#x" id="x"></a>`)
// and records ## and ### headings for the "On this page" outline.
function headingIds(state) {
  const used = (state.env.headingIds ||= new Set());
  const outline = (state.env.outline ||= []);
  for (let i = 0; i < state.tokens.length; i += 1) {
    const token = state.tokens[i];
    if (token.type !== 'heading_open') {
      continue;
    }
    const kids = state.tokens[i + 1].children || [];
    let id = null;
    for (let k = 0; k < kids.length - 1; k += 1) {
      const anchor = kids[k].type === 'html_inline' && kids[k].content.match(EMPTY_ANCHOR_OPEN);
      if (anchor && kids[k + 1].type === 'html_inline' && /^<\/a>$/i.test(kids[k + 1].content)) {
        id = anchor[1];
        kids.splice(k, 2);
        break;
      }
    }
    const last = kids[kids.length - 1];
    if (last && last.type === 'text') {
      last.content = last.content.replace(/\s+$/, '');
    }
    const text = kids
      .map((kid) => (kid.type === 'text' || kid.type === 'code_inline' ? kid.content : kid.type === 'softbreak' ? ' ' : ''))
      .join('')
      .trim();
    const base = id || headingSlug(text);
    let unique = base;
    for (let n = 1; used.has(unique); n += 1) {
      unique = `${base}-${n}`;
    }
    used.add(unique);
    token.attrSet('id', unique);
    if (token.tag === 'h2' || token.tag === 'h3') {
      outline.push({ level: Number(token.tag[1]), id: unique, text });
    }
  }
}

// GitBook draws `- [ ] item` and `- [x] item` as a list of disabled checkboxes, without bullets.
function taskLists(state) {
  const tokens = state.tokens;
  for (let i = 2; i < tokens.length; i += 1) {
    const inline = tokens[i];
    const item = tokens[i - 2];
    if (inline.type !== 'inline' || tokens[i - 1].type !== 'paragraph_open' || item.type !== 'list_item_open') {
      continue;
    }
    const first = inline.children && inline.children[0];
    const marker = first && first.type === 'text' && first.content.match(/^\[([ xX])\][  ]/);
    if (!marker) {
      continue;
    }
    first.content = first.content.slice(marker[0].length);
    const checked = marker[1] !== ' ';
    const box = new state.Token('html_inline', '', 0);
    box.content = `<span class="task-box${checked ? ' checked' : ''}" role="checkbox" aria-checked="${checked}" aria-disabled="true"></span>`;
    inline.children.unshift(box);
    item.attrJoin('class', 'task-item');
    for (let j = i - 3; j >= 0; j -= 1) {
      const list = tokens[j];
      if ((list.type === 'bullet_list_open' || list.type === 'ordered_list_open') && list.level === item.level - 1) {
        if (!(list.attrGet('class') || '').includes('task-list')) {
          list.attrJoin('class', 'task-list');
        }
        break;
      }
    }
  }
}

export function createMarkdown() {
  const md = new MarkdownIt({ html: true, linkify: false, typographer: false });
  md.use(footnote);
  md.core.ruler.push('gitbook_headings', headingIds);
  md.core.ruler.push('gitbook_task_lists', taskLists);

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0] || '';
    return renderCode(token.content, lang);
  };

  md.renderer.rules.code_block = (tokens, idx) => renderCode(tokens[idx].content, '');

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const href = token.attrGet('href');
    if (href !== null && env.ctx) {
      const target = env.ctx.resolveLink(href);
      token.attrSet('href', target.href);
      if (target.kind === 'broken') {
        token.attrJoin('class', 'broken-link');
        token.attrSet('title', `Not found: ${href}`);
      }
    }
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const src = token.attrGet('src');
    if (src !== null && env.ctx) {
      token.attrSet('src', env.ctx.resolveLink(src, { asset: true }).href);
    }
    token.attrSet('alt', self.renderInlineAsText(token.children, options, env));
    token.attrSet('loading', 'lazy');
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
  md.renderer.rules.table_close = () => '</table></div>\n';

  return md;
}
