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
    for (const model of await this.fetchModels()) {
      yield this.done({ model, swagger });
    }
  }
}

module.exports = ModelsGenerator;
