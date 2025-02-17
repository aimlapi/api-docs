const ModelsGenerator = require('./generators/models');
const ModelPageGenerator = require('./generators/model');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const { TEMPLATE, readTemplate, replaceTemplate, SECTION, CATEGORY } = require('./templates');
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
                content: readTemplate(TEMPLATE.models, SECTION.references),
                effects: [
                  StorePlugin.store((...args) => ({
                    path: `${PathPlugin.path(...args)}${path.sep}README.md`,
                    transform: replaceTemplate(TEMPLATE.models, SECTION.references),
                  })),
                  summary('README'),
                ],
              }),
              ModelPageGenerator.build({
                next: HandlebarsPageGenerator.build({
                  content: readTemplate(TEMPLATE.openapi, SECTION.references),
                  effects: [
                    StorePlugin.store((...args) => ({
                      path: `${PathPlugin.path(...args)}.md`,
                      transform: replaceTemplate(TEMPLATE.openapi, SECTION.reference),
                    })),
                    StorePlugin.store((...args) => ({
                      content: (_, c) => JSON.stringify(c.openapi.schema),
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
          //       transform: replaceTemplate(TEMPLATE.summary, SECTION.reference),
          //     })),
          //   ],
          // }),
        ],
      }),
    ],
  }),
  plugins: [new PathPlugin(), new StorePlugin()],
};

module.exports = {
  root,
};
