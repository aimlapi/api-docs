const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ModelPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, ...rest } = this.config;

    for (const model of models) {
      const { path, schema } = openapi.byModel[model.name];
      if(model.name.includes('Mistral')){
        console.log(rest)
      }
      if (!path) {
        console.warn(`Model '${model.name}' path not found.`);
      }

      yield this.done(
        {
          ...rest,
          openapi: {
            ...openapi,
            url: `./${model.alias}.json`,
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
