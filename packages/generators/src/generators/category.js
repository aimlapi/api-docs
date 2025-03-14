const PageGenerator = require('./common/page');
const PathPlugin = require('./plugins/path');

class CategoryPageGenerator extends PageGenerator {
  *generate() {
    const { models, ...rest } = this.config;

    const byCategory = {};
    for (const model of models) {
        byCategory[model.category] = [...(byCategory[model.category] ?? []), model];
    }

    for (const category in byCategory) {
      const categoryModels = byCategory[category];
      yield this.done(
        {
          ...rest,
          models: categoryModels,
        },
        PathPlugin.traverse(`/${category}`, category), // (for path, for name in SUMMARY.md)
      );
    }
  }
}

module.exports = CategoryPageGenerator;
