const path = require('path');
const fs = require('fs').promises;
const GeneratorPlugin = require('./plugin');

class StorePlugin extends GeneratorPlugin {
  static store(payload) {
    return StorePlugin.apply(payload);
  }

  async apply(ctx, config, payload) {
    const dirname = path.dirname(payload.path);
    const isDirExists = await fs.stat(dirname).catch(() => false);

    if (!isDirExists) {
      await fs.mkdir(dirname, { recursive: true });
    }

    const isFileExists = await fs.stat(payload.path).catch(() => false);
    const transform = payload.transform ?? ((_, n) => n);
    const content = transform(
      isFileExists ? await fs.readFile(payload.path, 'utf8') : '',
      payload.content ? payload.content(ctx, config) : config.content,
    );

    await fs.writeFile(payload.path, content);
  }
}

module.exports = StorePlugin;
