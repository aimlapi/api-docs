const path = require('path');
const fs = require('fs');
const GeneratorPlugin = require('./plugin');

class StorePlugin extends GeneratorPlugin {
  static store(payload) {
    return StorePlugin.apply(payload);
  }

  apply(ctx, config, payload) {
    const dirname = path.dirname(payload.path);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    const transform = payload.transform ?? ((_, n) => n);
    const content = transform(fs.existsSync(payload.path) ? fs.readFileSync(payload.path, 'utf8') : '', config.content);

    fs.writeFileSync(payload.path, content);
  }
}

module.exports = StorePlugin;
