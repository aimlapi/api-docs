const PageGenerator = require('./common/page');
const Handlebars = require('handlebars');
const PathPlugin = require('./plugins/path');
const { MODELS_TO_ALIAS_MAP, CATEGORY_MAPPING } = require('../templates');

class DataBaseModelsPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, modelsData, ...rest } = this.config;
    // console.log(MODELS_TO_ALIAS_MAP)
    const categoriesObj = {}
    const keys = Object.keys(CATEGORY_MAPPING)
    keys.forEach(key => {
      categoriesObj[key] = {
        category: CATEGORY_MAPPING[key],
        models: []
      }
    });

    const modelsBase = []
  
    modelsData.forEach(model => {
      if(!MODELS_TO_ALIAS_MAP[model.name]){
        return
      }
      const dataModel = {
        modelId: model.name,
        link: MODELS_TO_ALIAS_MAP[model.name].path,
        developer: model.info.developer,
        context: model.info?.contextLength ? model.info?.contextLength : '',
        modelCard: model.info.url,
      }
      categoriesObj[MODELS_TO_ALIAS_MAP[model.name].category].models.push(dataModel)
    });

    for (const category in categoriesObj){
      modelsBase.push(categoriesObj[category])
    }

    yield this.done({
      ...rest,
      categories: modelsBase,
      test: 'test1',
    },
    PathPlugin.traverse(`/model-database`, 'Model Database'));
  }
}

module.exports = DataBaseModelsPageGenerator;
