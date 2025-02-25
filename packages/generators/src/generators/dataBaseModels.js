const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');
const { MODELS_TO_ALIAS_MAP, CATEGORY_MAPPING, CATEGORY_SET } = require('../templates');

class DataBaseModelsPageGenerator extends PageGenerator {
  *generate() {
    const { models, openapi, modelsData, ...rest } = this.config;

    const categoriesObj = {}

    for (const item of CATEGORY_SET) {
      if (item.includes('/')){
        const arr = item.split('/')
        if (categoriesObj[arr[0]]) {
          categoriesObj[arr[0]].subCategory.push({
            name: CATEGORY_MAPPING[arr[1]],
            key: arr[1],
        })
          categoriesObj[arr[0]][arr[1]] = []
        } else {
          categoriesObj[arr[0]] = {
            category: CATEGORY_MAPPING[arr[0]],
            subCategory: [{
              name: CATEGORY_MAPPING[arr[1]],
              key: arr[1],
          }],
            [arr[1]]: [],
            models: [],
            isHasSub: true,
          }
        }
      } else {
        categoriesObj[item] = {
          category: CATEGORY_MAPPING[item],
          subCategory: [],
          models: [],
          isHasSub: false
        }
      }
    }

    const modelsBase = []
  
    modelsData.forEach(model => {
      if(!MODELS_TO_ALIAS_MAP[model.name]){
        return
      }
      const dataModel = {
        modelId: model.name,
        link: MODELS_TO_ALIAS_MAP[model.name].path.replace(/\\/g, '/').replace(/\api-references/g, '..'), // transform path: api-referenses\<category>\<vendor>\<alias> to /<category>/<vendor>/<alias>
        developer: model.info.developer,
        context: model.info?.contextLength ? model.info?.contextLength : '',
        modalName: model.info.name,
        modelCard: MODELS_TO_ALIAS_MAP[model.name].offsite_name || model.info.url,
      }
      const categoryModel = MODELS_TO_ALIAS_MAP[model.name].category
      
      if (categoryModel.includes('/')) {
        const arr = categoryModel.split('/')
        categoriesObj[arr[0]][arr[1]].push(dataModel)
        categoriesObj[arr[0]].models.push(dataModel)
      } else {
        categoriesObj[categoryModel].models.push(dataModel)
      }
      
    });

    for (const category in categoriesObj){
      modelsBase.push(categoriesObj[category])
    }

    yield this.done({
      ...rest,
      categories: modelsBase,
    },
    PathPlugin.traverse(`/model-database`, 'Model Database')); // (for path, for name in SUMMARY.md)
  }
}

module.exports = DataBaseModelsPageGenerator;
