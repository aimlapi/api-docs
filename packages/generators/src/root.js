const ModelsGenerator = require('./generators/models');
const ModelPageGenerator = require('./generators/model');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const { TEMPLATE, readTemplate, replaceTemplate, SECTION, CATEGORY, ALIAS_MAP } = require('./templates');
const { MODELS_URL, OPENAPI_URL } = require('./config');
const CustomGenerator = require('./generators/custom');
const VenderPageGenerator = require('./generators/vendor');
const { SummaryParserMap } = require('./templates/parser');
const { summary } = require('./generators/plugins/preset');
const path = require('path');
const CategoryPageGenerator = require('./generators/category');

const DOCS_PATH = '/api-references';

const root = {
  next: ModelsGenerator.build({
    url: path.join(__dirname, "json_for-docs_generation_20250211_v3.json"), //MODELS_URL,
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
              ModelPageGenerator.build({
                next: HandlebarsPageGenerator.build({
                  content: readTemplate(TEMPLATE.openapi),
                  effects: [
                    StorePlugin.store((...args) => ({
                      path: `${PathPlugin.path(...args)}.md`,
                      transform: replaceTemplate(TEMPLATE.openapi),
                    })),
                    StorePlugin.store((...args) => ({
                      content: (_, c) => JSON.stringify(jsonModify(c.openapi.schema, ...args)),
                      path: `${PathPlugin.path(...args)}.json`,
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
    ],
  }),
  plugins: [new PathPlugin(), new StorePlugin()],
};

const jsonModify = (data, args) => {
  const key = Object.keys(data.paths)[0]
  const alias = args[args.plugins[0].id].tags.at(-1)

  if (ALIAS_MAP[alias]) {
    if (data.paths[key].post.requestBody.content["application/json"].schema?.properties?.model?.enum)
      data.paths[key].post.requestBody.content["application/json"].schema.properties.model.enum = ALIAS_MAP[alias]
  }
  
  return data
}

module.exports = {
  root,
};
