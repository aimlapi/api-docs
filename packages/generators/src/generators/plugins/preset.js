const path = require('path');

const { replaceTemplate, TEMPLATE, SECTION } = require('../../templates');
const { SummaryParserMap } = require('../../templates/parser');

const PathPlugin = require('./path');
const StorePlugin = require('./store');

const summary = (name) =>
  StorePlugin.store((...args) => ({
    content: (...args) => {
      const root = PathPlugin.root(...args);
      const file = path.relative(root, PathPlugin.path(...args))
      //  PathPlugin.path(...args)
      //   .split(`${root}${path.sep}`)
      //   .at(1);
       

      const key = file.split(`${path.sep}`).at(-1);
      const tags = PathPlugin.tags(...args);

      return { key, tags, file: name ? path.join(file, name) : file };
    },
    path: `${PathPlugin.root(...args)}${path.sep}SUMMARY.md`,
    transform: replaceTemplate(TEMPLATE.summary, SECTION.reference, (match, next) => {
      const { file, tags, key } = next;

      const summary = SummaryParserMap.parse(match);

      let children = summary;
      // console.log('@@@##', tags)
      // console.log('summary@#summary', summary)
      for (const tag of tags.slice(0, tags.length - 1)) {
        console.log(' children[tag]',  children[tag])
        console.log(' children[tag].children', children[tag]?.children)
        console.log(' TAG', tag)
        if(children[tag]?.children)
        children = children[tag]?.children;
      }
      console.log('key', key)
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
