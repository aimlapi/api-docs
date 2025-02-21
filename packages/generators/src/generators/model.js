const { ALIAS_PATH_MAP, ALIAS_MAP } = require('../templates');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ModelPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, ...rest } = this.config;
    for (const model of models) {
      const { path, schema, method, pair } = openapi.byModel[model.name];
      if (!path) {
        console.warn(`Model '${model.name}' path not found.`);
      }
      const aliastToPAth = model.alias.replace(/#/g, '').replace(/ /g, '-').replace(/\//g, '-');
      if (model.alias !== aliastToPAth) {
        ALIAS_PATH_MAP.set(aliastToPAth, model.alias);
      } 
      if (pair?.has) {
        pair.url = `./${aliastToPAth}-pair.json`;
      }
      yield this.done(
        {
          ...rest,
          openapi: {
            ...openapi,
            url: `./${aliastToPAth}.json`,
            alias: model.alias,
            model: model.name,
            models: ALIAS_MAP[model.alias],
            description: model.description,
            path,
            method: method,
            schema,
            pair,
          },
          model,
        },
        PathPlugin.traverse(`/${aliastToPAth}`, model.alias),
      );
    }
  }
}

module.exports = ModelPageGenerator;
