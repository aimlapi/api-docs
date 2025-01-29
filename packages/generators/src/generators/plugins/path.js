const path = require('path');
const GeneratorPlugin = require('./plugin');

class PathPlugin extends GeneratorPlugin {
  static traverse(path, tag) {
    return this.apply({ path, tag });
  }

  static get path() {
    return (config) => {
      const state = PathPlugin.locate(config.plugins).state(config);
      return path.join(state.root, state.path);
    };
  }

  static get tags() {
    return (config) => PathPlugin.locate(config.plugins).state(config).tags ?? [];
  }

  static get pathname() {
    return (config) => PathPlugin.locate(config.plugins).state(config).path;
  }

  static get root() {
    return (config) => PathPlugin.locate(config.plugins).state(config).root;
  }

  apply(ctx, config, payload) {
    const state = this.state(ctx);
    state.path = path.join(state.path || '.', payload.path);
    state.tags ??= [];

    if (payload.tag) {
      state.tags.push(payload.tag);
    }
  }
}

module.exports = PathPlugin;
