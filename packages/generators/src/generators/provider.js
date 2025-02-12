const { OPENAPI_URL } = require('../config');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class ProviderPageGenerator extends PageGenerator {
  *generate() {
    const { models, ...rest } = this.config;

    const byVendor = {};
    for (const model of models) {
      byVendor[model.vendor] = [...(byVendor[model.vendor] ?? []), model];
    }

    for (const vendor in byVendor) {
      const vendorModels = byVendor[vendor];
      yield this.done(
        {
          ...rest,
          models: vendorModels,
        },
        PathPlugin.traverse(`/${vendor}`, vendor),
      );
    }
  }
}

module.exports = ProviderPageGenerator;
