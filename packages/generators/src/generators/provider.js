const { OPENAPI_URL } = require('../config');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ProviderPageGenerator extends PageGenerator {
  *generate() {
    const { models, ...rest } = this.config;

    const byProvider = {};
    for (const model of models) {
      byProvider[model.provider] = [...(byProvider[model.provider] ?? []), model];
    }

    for (const provider in byProvider) {
      const providerModels = byProvider[provider];
      yield this.done(
        {
          ...rest,
          models: providerModels,
        },
        PathPlugin.traverse(`/${provider}`, provider),
      );
    }
  }
}

module.exports = ProviderPageGenerator;
