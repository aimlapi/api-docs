const ModelsGenerator = require('./generators/models');
const AliasPageGenerator = require('./generators/alias');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const { TEMPLATE, readTemplate, replaceTemplate, SECTION, CATEGORY, ALIAS_MAP, MODELS_TO_ALIAS_MAP } = require('./templates');
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
    url: path.join(__dirname, "json_for-docs_generation_20250226.json"), //MODELS_URL,
    openapi: {
      url: OPENAPI_URL,
    },
    effects: [PathPlugin.traverse(DOCS_PATH)],
    next:[
      CategoryPageGenerator.build({
        next: [
          VenderPageGenerator.build({
            next: [
              HandlebarsPageGenerator.build({
                content: readTemplate(TEMPLATE.models),
                effects: [
                  StorePlugin.store((...args) => ({
                    path: `${PathPlugin.path(...args)}${path.sep}README.md`,
                    transform: replaceTemplate(TEMPLATE.models),
                  })),
                  summary('README'),
                ],
              }),
              AliasPageGenerator.build({
                next: HandlebarsPageGenerator.build({
                  content: readTemplate(TEMPLATE.openapi),
                  effects: [
                    StorePlugin.store((...args) => ({
                      path: `${PathPlugin.path(...args)}.md`,
                      transform: replaceTemplate(TEMPLATE.openapi),
                    })),
                    StorePlugin.store((...args) => ({
                      content: (_, c) => JSON.stringify(jsonModify(c.openapi, ...args)),
                      path: `${PathPlugin.path(...args)}.json`,
                    })),
                    StorePlugin.store((...args) => ({
                      content: (_, c) => JSON.stringify(jsonModifyForPair(c.openapi, ...args)),
                      path: `${PathPlugin.path(getArgs(...args))}.json`,
                    })),
                    summary(),
                  ],
                }),
              }),
            ],
          }),
          // HandlebarsPageGenerator.build({
          //   content: readTemplate(TEMPLATE.summary, SECTION.references),
          //   effects: [
          //     StorePlugin.store((...args) => ({
          //       path: `${PathPlugin.root(...args)}/SUMMARY.md`,
          //       transform: replaceTemplate(TEMPLATE.summary),
          //     })),
          //   ],
          // }),
        ],
      }),
      DataBaseModelsPageGenerator.build({
        next: HandlebarsPageGenerator.build({
          content: readTemplate(TEMPLATE.modelsData),
          effects: [
            StorePlugin.store((...args) => ({
              path: `${PathPlugin.path(...args)}${path.sep}/model-database.md`,
              transform: replaceTemplate(TEMPLATE.modelsData),
            })),
            dataBaseModels(),
          ],
        }),
      }),
    ]
  }),

  plugins: [new PathPlugin(), new StorePlugin()],
};

const pairMap = {}
const getArgs = (args) => {
  const alias = args[args.plugins[0].id].tags.at(-1)
  if(pairMap[alias]) {
    return pairMap[alias]
  }
  return args
}
const jsonModify = (data, args) => {
  const key = Object.keys(data.schema.paths)[0]
  const alias = args[args.plugins[0].id].tags.at(-1)
  const root = PathPlugin.root(args);
  const file = path.relative(root, PathPlugin.path(args))
  MODELS_TO_ALIAS_MAP[data.model].path = file
  // save for pair fetch in alias
  if (data.pair.has) {
  
    const cloned = _.cloneDeep(args);
    cloned[cloned.plugins[0].id].path = cloned[cloned.plugins[0].id].path + '-pair'
    savePair(alias, cloned)
  }
  // changing the list of models
  // if (ALIAS_MAP[alias]) {
  //   if (data.schema.paths[key].post.requestBody.content["application/json"].schema?.properties?.model?.enum)
  //     data.schema.paths[key].post.requestBody.content["application/json"].schema.properties.model.enum = ALIAS_MAP[alias]
  // }
  
  return data.schema
}

const savePair = (alias, cloned) => {
  if(!pairMap[alias])
    pairMap[alias] = cloned
}

// if there is a second endpoint for this alias, a json with the '-pair' appended is created
const jsonModifyForPair = (data, args) => {
  if (data.pair.has) {
    const key = Object.keys(data.pair.schema.paths)[0]
    const alias = args[args.plugins[0].id].tags.at(-1)

    // if (ALIAS_MAP[alias]) {
    //   if (data.pair.schema.paths[key][data.pair.method].requestBody.content["application/json"].schema?.properties?.model?.enum)
    //     data.pair.schema.paths[key][data.pair.method].requestBody.content["application/json"].schema.properties.model.enum = ALIAS_MAP[alias]
    // }
    
    return data.pair.schema
  }

  const key = Object.keys(data.schema.paths)[0]
  const alias = args[args.plugins[0].id].tags.at(-1)

  // if (ALIAS_MAP[alias]) {
  //   if (data.schema.paths[key].post.requestBody.content["application/json"].schema?.properties?.model?.enum)
  //     data.schema.paths[key].post.requestBody.content["application/json"].schema.properties.model.enum = ALIAS_MAP[alias]
  // }
  
  return data.schema
}

module.exports = {
  root,
};
