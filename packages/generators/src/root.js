const ModelsGenerator = require('./generators/models');
const AliasPageGenerator = require('./generators/alias');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const {
  TEMPLATE,
  readTemplate,
  replaceTemplate,
  SECTION,
  CATEGORY,
  ALIAS_MAP,
  MODELS_TO_ALIAS_MAP,
} = require('./templates');
const { MODELS_URL, OPENAPI_URL } = require('./config');
const CustomGenerator = require('./generators/custom');
const VenderPageGenerator = require('./generators/vendor');
const { SummaryParserMap } = require('./templates/parser');
const { summary, dataBaseModels } = require('./generators/plugins/preset');
const CategoryPageGenerator = require('./generators/category');
const path = require('path');
const _ = require('lodash');
const DataBaseModelsPageGenerator = require('./generators/dataBaseModels');

const DOCS_PATH = '/api-references';

const root = {
  next: ModelsGenerator.build({
    url: path.join(__dirname, 'json_for-docs_generation.json'), //MODELS_URL,
    openapi: {
      url: OPENAPI_URL,
    },
    effects: [PathPlugin.traverse(DOCS_PATH)],
    next: [
      CategoryPageGenerator.build({
        next: [
          VenderPageGenerator.build({
            next: [
              AliasPageGenerator.build({
                effects: [
                  StorePlugin.store((...args) => ({
                    content: (_, c) =>
                      JSON.stringify(jsonModify(c.openapi, ...args)),
                    path: `${PathPlugin.path(...args)}.json`,
                  })),
                  StorePlugin.store((...args) => ({
                    content: (_, c) =>
                      JSON.stringify(jsonModifyForPair(c.openapi, ...args)),
                    path: `${PathPlugin.path(getArgs(...args))}.json`,
                  })),
                ],
              }),
            ],
          }),
        ],
      }),
      // DataBaseModelsPageGenerator.build({
      //   next: HandlebarsPageGenerator.build({
      //     content: readTemplate(TEMPLATE.modelsData),
      //     effects: [
      //       StorePlugin.store((...args) => ({
      //         path: `${PathPlugin.path(...args)}${path.sep}/model-database.md`,
      //         transform: replaceTemplate(TEMPLATE.modelsData),
      //       })),
      //       dataBaseModels(),
      //     ],
      //   }),
      // }),
    ],
  }),

  plugins: [new PathPlugin(), new StorePlugin()],
};

const pairMap = {};
const getArgs = (args) => {
  const alias = args[args.plugins[0].id].tags.at(-1);
  if (pairMap[alias]) {
    return pairMap[alias];
  }
  return args;
};
const jsonModify = (data, args) => {
  const key = Object.keys(data.schema.paths)[0];
  const alias = args[args.plugins[0].id].tags.at(-1);
  const root = PathPlugin.root(args);
  const file = path.relative(root, PathPlugin.path(args));
  MODELS_TO_ALIAS_MAP[data.model].path = file;
  // save for pair fetch in alias
  if (data.pair.has) {
    const cloned = _.cloneDeep(args);
    cloned[cloned.plugins[0].id].path =
      cloned[cloned.plugins[0].id].path + '-pair';
    savePair(alias, cloned);
  }

  return data.schema;
};

const savePair = (alias, cloned) => {
  if (!pairMap[alias]) pairMap[alias] = cloned;
};

// if there is a second endpoint for this alias, a json with the '-pair' appended is created
const jsonModifyForPair = (data, args) => {
  if (data.pair.has) {
    return data.pair.schema;
  }

  return data.schema;
};

module.exports = {
  root,
};
