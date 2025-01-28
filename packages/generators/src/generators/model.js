const { OPENAPI_URL } = require('../config');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ModelPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, ...rest } = this.config;
    const { byModel } = openapi;

    for (const model of models) {
      const { path, schema } = byModel[model.name];

      if (!path) {
        console.warn(`Model '${model.name}' path not found.`);
      }

      yield this.done(
        {
          ...rest,
          openapi: {
            ...openapi,
            url: `./${model.key}.json`,
            path,
            method: 'post',
            schema,
          },
          model,
        },
        PathPlugin.traverse(`/${model.key}`),
      );
    }
  }
}

module.exports = ModelPageGenerator;
