const ModelsGenerator = require('./generators/models');
const ModelPageGenerator = require('./generators/model');
const HandlebarsPageGenerator = require('./generators/common/handlebars');
const PathPlugin = require('./generators/plugins/path');
const StorePlugin = require('./generators/plugins/store');
const { TEMPLATE, readTemplate } = require('./templates');
const { MODELS_URL, OPENAPI_URL: SWAGGER_URL } = require('./config');
const CustomGenerator = require('./generators/custom');

const root = {
  next: ModelsGenerator.build({
    url: MODELS_URL,
    swagger: {
      url: SWAGGER_URL,
    },
    next: ModelPageGenerator.build({
      content: readTemplate(TEMPLATE.swagger),
      next: [
        HandlebarsPageGenerator.build({
          effects: [
            StorePlugin.store((...args) => ({
              path: `${PathPlugin.path(...args)}.md`,
              transform: (prev, next) => {
                if (!prev.trim()) {
                  return next;
                }

                const expr = /{% swagger generated.+{% endswagger %}/gs;

                const isHas = expr.test(prev);
                if (isHas) {
                  return prev.replace(/{% swagger generated.+{% endswagger %}/gs, next);
                } else {
                  return prev + '\n' + next;
                }
              },
            })),
          ],
        }),
        CustomGenerator.build({
          *generate(config) {
            return { content: config.swagger.schema };
          },
          effects: [
            StorePlugin.store((...args) => ({
              path: `${PathPlugin.path(...args)}.json`,
            })),
          ],
          content: 'ho',
        }),
      ],
    }),
  }),
  plugins: [new PathPlugin(), new StorePlugin()],
};

module.exports = {
  root,
};
