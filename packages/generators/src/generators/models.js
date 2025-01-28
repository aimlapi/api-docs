const parseOpenapi = require('../utils/parse-openapi');
const PageGenerator = require('./common/page');

class ModelsGenerator extends PageGenerator {
  async fetchModels() {
    return await fetch(this.config.url).then((res) => res.json());
  }

  async fetchSwagger() {
    return await fetch(this.config.swagger.url).then((res) => res.json());
  }

  async *generate() {
    const swagger = parseOpenapi(await this.fetchSwagger());
    const models = await this.fetchModels();

    for (const model of models) {
      model.key = model.name.replace(/[\/#]/g, ' ').trim().replace(/\s+/g, '-');
    }

    yield this.done({ models, swagger });
  }
}

module.exports = ModelsGenerator;
