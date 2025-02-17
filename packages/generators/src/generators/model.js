const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ModelPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, ...rest } = this.config;
    const aliasesMap = {}
    for (const model of models) {
      if (aliasesMap[model.alias]) {
        aliasesMap[model.alias].push(model.name)
      } else {
        aliasesMap[model.alias] = [model.name]
      }
      
    }
    for (const model of models) {
      const { path, schema } = openapi.byModel[model.name];
      if (!path) {
        console.warn(`Model '${model.name}' path not found.`);
      }

      yield this.done(
        {
          ...rest,
          openapi: {
            ...openapi,
            url: `./${model.alias}.json`,
            alias: model.alias,
            models: aliasesMap[model.alias],
            path,
            method: 'post',
            schema,
          },
          model,
        },
        PathPlugin.traverse(`/${model.alias}`, model.alias),
      );
    }
  }
}

module.exports = ModelPageGenerator;
