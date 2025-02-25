const { ALIAS_PATH_MAP, ALIAS_MAP, NO_PARSE_MODAL, MODELS_TO_ALIAS_MAP } = require('../templates');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class AliasPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, ...rest } = this.config;
    const sortedModels = models.sort((a, b) => a.alias.localeCompare(b.alias))

    for (const model of sortedModels) {
      if(!openapi.byModel[model.name]){
        if(NO_PARSE_MODAL.includes(model.name)){
          MODELS_TO_ALIAS_MAP[model.name].path = `api-referenses/${model.category}/${model.vendor.replace(/ /g, '-')}/${model.alias.replace(/#/g, '').replace(/ /g, '-').replace(/\//g, '-')}`
          console.warn(`Model '${model.name}' is EXCEPTIONS.`);
          continue
        }
        console.warn(`Model '${model.name}' path not found.`);
        continue
      }
 

      const { path, schema, method, pair } = openapi.byModel[model.name];
      if (!path) {
        console.warn(`Model '${model.name}' path not found.`);
      }
      // Replacing significant symbols in alias
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
            models: ALIAS_MAP[model.alias].sort(),
            description: model.description,
            path,
            method: method,
            schema,
            pair,
          },
          model,
        },
        PathPlugin.traverse(`/${aliastToPAth}`, model.alias), // (for path, for name in SUMMARY.md)
      );
    }
  }
}

module.exports = AliasPageGenerator;
