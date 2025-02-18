const parseOpenapi = require('../utils/parse-openapi');
const PageGenerator = require('./common/page');
const fs = require("fs").promises;

class ModelsGenerator extends PageGenerator {
  async fetchModels() {
    if(this.config.url.includes('json_for-docs_generation_20250211_v3.json')){
      const data = await fs.readFile(this.config.url, { encoding: "utf-8" });
      const json = JSON.parse(data);
      return json;
    }
    return await fetch(this.config.url).then((res) => res.json());
  }

  async fetchSwagger() {
    return await fetch(this.config.openapi.url).then((res) => res.json());
  }

  async *generate() {
    const models = await this.fetchModels();
    const openapi = parseOpenapi(await this.fetchSwagger(), models);

    for (const model of models) {
      model.key = model.name.replace(/[\/#]/g, ' ').trim().replace(/\s+/g, '-');
    }

    yield this.done({ models, openapi });
  }
}

module.exports = ModelsGenerator;
