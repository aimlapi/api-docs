const ModelsGenerator = require('./generators/models');
const ModelPageGenerator = require('./generators/model');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const { TEMPLATE, readTemplate, replaceTemplate } = require('./templates');
const { MODELS_URL, OPENAPI_URL } = require('./config');
const CustomGenerator = require('./generators/custom');
const ProviderPageGenerator = require('./generators/provider');
const { SummaryParserMap } = require('./templates/parser');
const { summary } = require('./generators/plugins/preset');
const path = require('path');

const DOCS_PATH = '/generated1';

const root = {
  next: ModelsGenerator.build({
    url: path.join(__dirname, "json_for-docs_generation_20250211_v2.json"), //MODELS_URL,
    openapi: {
      url: OPENAPI_URL,
    },
    effects: [PathPlugin.traverse(DOCS_PATH)],
    next: [
      ProviderPageGenerator.build({
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
      //   content: readTemplate(TEMPLATE.summary),
      //   effects: [
      //     StorePlugin.store((...args) => ({
      //       path: `${PathPlugin.root(...args)}/SUMMARY.md`,
      //       transform: replaceTemplate(TEMPLATE.summary),
      //     })),
      //   ],
      // }),
    ],
  }),
  plugins: [new PathPlugin(), new StorePlugin()],
};

module.exports = {
  root,
};
