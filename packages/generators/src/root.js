const ModelsGenerator = require('./generators/models');
const ModelPageGenerator = require('./generators/model');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const { TEMPLATE, readTemplate, replaceTemplate } = require('./templates');
const { MODELS_URL, OPENAPI_URL: SWAGGER_URL } = require('./config');
const CustomGenerator = require('./generators/custom');

const root = {
  next: ModelsGenerator.build({
    url: MODELS_URL,
    swagger: {
      url: SWAGGER_URL,
    },
    next: [
      ModelPageGenerator.build({
        next: HandlebarsPageGenerator.build({
          content: readTemplate(TEMPLATE.swagger),
          effects: [
            StorePlugin.store((...args) => ({
              path: `${PathPlugin.path(...args)}.md`,
              transform: replaceTemplate(TEMPLATE.swagger),
            })),
          ],
        }),
      }),
      HandlebarsPageGenerator.build({
        content: readTemplate(TEMPLATE.summary),
        effects: [
          StorePlugin.store((...args) => ({
            path: `${PathPlugin.root(...args)}/SUMMARY.md`,
            transform: replaceTemplate(TEMPLATE.summary),
          })),
        ],
      }),
      HandlebarsPageGenerator.build({
        content: readTemplate(TEMPLATE.models),
        effects: [
          StorePlugin.store((...args) => ({
            path: `${PathPlugin.path(...args)}/README.md`,
            transform: replaceTemplate(TEMPLATE.models),
          })),
        ],
      }),
    ],
  }),
  plugins: [new PathPlugin(), new StorePlugin()],
};

module.exports = {
  root,
};
