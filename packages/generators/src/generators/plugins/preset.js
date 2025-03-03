const path = require('path');

const { replaceTemplate, TEMPLATE, SECTION, CATEGORY_MAPPING, MODELS_TO_ALIAS_MAP } = require('../../templates');
const { SummaryParserMap } = require('../../templates/parser');

const PathPlugin = require('./path');
const StorePlugin = require('./store');

const summary = (name) =>
  StorePlugin.store((...args) => ({
    content: (...args) => {
      const root = PathPlugin.root(...args);
      const file = path.relative(root, PathPlugin.path(...args))

      const key = file.split(`${path.sep}`).at(-1);
      const tags = PathPlugin.tags(...args);

      return { key, tags, file: name ? path.join(file, name) : file };
    },
    path: `${PathPlugin.root(...args)}${path.sep}SUMMARY.md`,
    transform: replaceTemplate(TEMPLATE.summary, (match, next) => {
      const { file, tags, key } = next;

      const summary = SummaryParserMap.parse(match);
      const childrenObject = transformToObject(summary?.children)

      let children = childrenObject;

      for (const tag of tags.slice(0, tags.length -1)) {           
        if(CATEGORY_MAPPING[tag]){
          if(tag === 'speech-voice-models/stt' || tag === 'speech-voice-models/tts') {
            const arr = tag.split('/')
            children = children[CATEGORY_MAPPING[arr[0]]]?.children;
            children = children[CATEGORY_MAPPING[arr[1]]]?.children;
          } else if (tag === 'ocr' || tag === 'ofr') {
            children = children[CATEGORY_MAPPING["vision-models"]]?.children;
            children = children[CATEGORY_MAPPING[tag]]?.children;
          } else {
            if(children[CATEGORY_MAPPING[tag]]?.children)
              children = children[CATEGORY_MAPPING[tag]]?.children;
          }
        } else {
          if(children[tag]?.children)
          children = children[tag]?.children;
        }
      }
      // Replacing significant symbols in path
      const fixPath = file.replace(/\\/g, '/').replace(/ /g, '-').replace(/#/g, '')

      children[key] = {
        ...children[key],
        key: key,
        value: `${fixPath}.md`,
        children: { ...children[key]?.children },
      };

      const stringified = SummaryParserMap.stringify(childrenObject);

      return `## API REFERENCES\n${stringified}`;
    }),
  }));

function transformToObject(childrenArray) {
  const result = {};
  for (const item of childrenArray) {
    const transformedItem = {
      key: item.key,
      value: item.value,
      children: item.children && item.children.length > 0 
                ? transformToObject(item.children) 
                : {},
      level: item.level
    };
    result[item.key] = transformedItem;
  }
  return result;
}

const dataBaseModels = () => 
  StorePlugin.store((...args) => ({
  content: (...args) => {
    const root = PathPlugin.root(...args);
    const file = path.relative(root, PathPlugin.path(...args))

    const key = file.split(`${path.sep}`).at(-1);
    const tags = PathPlugin.tags(...args);

    return { key, tags, file: file };
  },
  path: `${PathPlugin.root(...args)}${path.sep}SUMMARY.md`,
  transform: replaceTemplate(TEMPLATE.summary, (match, next) => {
    const { file } = next;
    const key = '📒 All Model IDs'
    const summary = SummaryParserMap.parse(match);
    const childrenObject = transformToObject(summary?.children)
    let children = childrenObject;
    // Replacing significant symbols in path, adding folder name to path
    const fixPath = file.replace(/\\/g, '/').replace(/ /g, '-').replace(/#/g, '') + '/model-database';
    children[key] = {
      ...children[key],
      key: key,
      value: `${fixPath}.md`,
      children: { ...children[key]?.children },
    };

    const stringified = SummaryParserMap.stringify(childrenObject);

    return `## API REFERENCES\n${stringified}`;
  }),
}));

module.exports = { summary, dataBaseModels };
