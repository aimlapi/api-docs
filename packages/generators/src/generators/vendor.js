const { OPENAPI_URL } = require('../config');
const { VENDORS_PATH_MAP } = require('../templates');
const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class VenderPageGenerator extends PageGenerator {
  *generate() {
    const { models, ...rest } = this.config;

    const byVendor = {};
    for (const model of models) {
      byVendor[model.vendor] = [...(byVendor[model.vendor] ?? []), model];
    }

    for (const vendor in byVendor) {
      // Replacing significant symbols in vendor
      const replaceVendor = vendor.replace(/ /g, '-');
      if (replaceVendor !== vendor) {
        VENDORS_PATH_MAP.set(replaceVendor, vendor)
      }
      const vendorModels = byVendor[vendor];
      yield this.done(
        {
          ...rest,
          models: vendorModels,
        },
        PathPlugin.traverse(`/${replaceVendor}`, vendor), // (for path, for name in SUMMARY.md)
      );
    }
  }
}

module.exports = VenderPageGenerator;
