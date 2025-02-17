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
      const aliastToPAth = model.alias.replace(/#/g, '')
      if(model.alias.includes('gen3')){
        console.log(model.alias)
      }
      yield this.done(
        {
          ...rest,
          openapi: {
            ...openapi,
            url: `./${aliastToPAth}.json`,
            alias: model.alias,
            models: aliasesMap[model.alias],
            path,
            method: 'post',
            schema,
          },
          model,
        },
        PathPlugin.traverse(`/${aliastToPAth}`, aliastToPAth),
      );
    }
  }
}

module.exports = ModelPageGenerator;
