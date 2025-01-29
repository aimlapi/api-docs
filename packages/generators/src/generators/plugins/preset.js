const path = require('path');

const { replaceTemplate, TEMPLATE } = require('../../templates');
const { SummaryParserMap } = require('../../templates/parser');

const PathPlugin = require('./path');
const StorePlugin = require('./store');

const summary = (name) =>
  StorePlugin.store((...args) => ({
    content: (...args) => {
      const root = PathPlugin.root(...args);
      const file = PathPlugin.path(...args)
        .split(`${root}/`)
        .at(1);

      const key = file.split(`/`).at(-1);
      const tags = PathPlugin.tags(...args);

      return { key, tags, file: name ? path.join(file, name) : file };
    },
    path: `${PathPlugin.root(...args)}/SUMMARY.md`,
    transform: replaceTemplate(TEMPLATE.summary, (match, next) => {
      const { file, tags, key } = next;

      const summary = SummaryParserMap.parse(match);

      let children = summary;
      for (const tag of tags.slice(0, tags.length - 1)) {
        children = children[tag].children;
      }

      children[key] = {
        ...children[key],
        key: key,
        value: `${file}.md`,
        children: { ...children[key]?.children },
      };

      const stringified = SummaryParserMap.stringify(summary);

      return `## Generated\n${stringified}`;
    }),
  }));

module.exports = { summary };
