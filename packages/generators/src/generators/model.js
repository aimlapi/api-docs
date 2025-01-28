const { OPENAPI_URL } = require('../config');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ModelPageGenerator extends PageGenerator {
  *generate() {
    const { models, swagger, ...rest } = this.config;
    const { byModel } = swagger;

    for (const model of models) {
      const { path, schema } = byModel[model.name];

      if (!path) {
        console.warn(`Model '${model.name}' path not found.`);
      }

      yield this.done(
        {
          ...rest,
          swagger: {
            ...swagger,
            url: OPENAPI_URL,
            path,
            method: 'post',
            schema,
          },
          model,
        },
        PathPlugin.traverse(`/${model.name.replaceAll('/', ' ')}`),
      );
    }
  }
}

module.exports = ModelPageGenerator;
