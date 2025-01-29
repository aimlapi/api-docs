const { v4: uuid } = require('uuid');

class GeneratorPlugin {
  constructor() {
    this.id = uuid();
  }

  static locate(plugins) {
    return plugins.find((p) => p instanceof this);
  }

  static apply(payload) {
    return (ctx, config) => {
      const target = this.locate(ctx.plugins);
      return target.apply(ctx, config, typeof payload === 'function' ? payload(ctx) : payload);
    };
  }

  state(ctx) {
    ctx[this.id] ??= {};

    return ctx[this.id];
  }

  update(ctx, payload) {
    Object.assign(this.state(ctx), payload);
  }

  async apply(ctx, config, payload) {
    throw new Error('Method not implemented');
  }
}

module.exports = GeneratorPlugin;
