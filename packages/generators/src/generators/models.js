const { MODELS_URL } = require('../config');
const parseOpenapi = require('../utils/parse-openapi');
const PageGenerator = require('./common/page');
const yaml = require('js-yaml');
const fs = require("fs").promises;

class ModelsGenerator extends PageGenerator {
  async fetchModels() {
    if(this.config.url.includes('json_for-docs_generation.json')){
      const data = await fs.readFile(this.config.url, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json;
    }
    return await fetch(this.config.url).then((res) => res.json());
  }
  // delete how models will be transferred from json to url 
  async fetchModelsCop() {
    return await fetch(MODELS_URL).then((res) => res.json());
  }

  async fetchSwagger() {
    return await fetch(this.config.openapi.url).then((res) => res.text());
  }

  async *generate() {
    const models = await this.fetchModels();
    const swaggerData = yaml.load(await this.fetchSwagger()); 
    const modelsData = await this.fetchModelsCop();  // delete how models will be transferred from json to url 
    const openapi = await parseOpenapi(swaggerData, models);

    for (const model of models) {
      model.key = model.name.replace(/[\/#]/g, ' ').trim().replace(/\s+/g, '-');
    }

    yield this.done({ models, openapi, modelsData });
  }
}

module.exports = ModelsGenerator;
