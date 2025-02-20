const { VENDORS_PATH_MAP, ALIAS_PATH_MAP } = require(".");

class SummaryParserList {
  static parse(text) {
    const expr = /^(\s*?)\*\s\[(.+)\]\((.+)\)/gm;

    let level = 0;
    let previous = null;
    let result = [];

    const matches = text.matchAll(expr);
    for (const match of matches) {
      const [, spaces, key, value] = match;

      if (level === spaces.length / 2) {
        result.push({ key, value, items: [] });
      } else if (level < spaces.length / 2) {
        previous = result;
        result = [{ key, value, items: [] }];
        previous.at(-1).items = result;
        level += 1;
      } else if (level > spaces.length / 2) {
        result = previous;
        result.push({ key, value, items: [] });
        level -= 1;
      }
    }

    return result;
  }
  static stringify(items) {}
}

class SummaryParserMap {
  static parse(text) {
    const expr = /^(\s*?)\*\s\[(.+)\]\((.+)\)/gm;

    let level = 0;
    let previous = null;
    let result = { key: 'root', value: '', children: [], level: -1 };
    let root = result;
    const stack = [root];

    const matches = text.replace(/^\n?/gm, '').matchAll(expr);
    for (const match of matches) {
      const [, spaces, key, value] = match;

      if (!match) continue;
      const level = spaces.length / 2;
      const modifiedKey = VENDORS_PATH_MAP.has(key) ? VENDORS_PATH_MAP.get(key) 
      : ALIAS_PATH_MAP.has(key) ? ALIAS_PATH_MAP.get(key) 
      : key
      const node = {
        key: modifiedKey,
        value: value,
        children: [],
        level: level
      };
      while (stack.length > level + 1) stack.pop();
      const parent = stack[level];
      parent.children.push(node);
      stack[level + 1] = node;
    }

    return root;
  }
  static stringify(content, level = 0) {
    const result = [];
    for (const key in content) {
      const { value, children } = content[key];
      result.push(`${`  `.repeat(level)}* [${key}](${value})\n`);

      const inner = SummaryParserMap.stringify(children, level + 1);
      if (inner) {
        result.push(inner);
      }
    }

    return result.join('');
  }
}

module.exports = { SummaryParserList, SummaryParserMap };
