const _ = require('lodash');

class PageGenerator {
  constructor(config) {
    this.config = config;
    this.config.next ??= PageGenerator;
  }

  static build(config) {
    return new this(config);
  }

  build(config) {
    this.config = { ...this.config, ...config };

    return this;
  }

  done(next, ...newEffects) {
    const effects = [...(this.config.effects ?? []), ...newEffects];

    if (!next || next instanceof PageGenerator) {
      return { next, effects };
    }

    const { effects: _, next: __, ...rest } = next;

    return {
      next: Array.isArray(this.config.next)
        ? this.config.next.map((next) => next.build(rest))
        : this.config.next.build(rest),
      effects,
    };
  }

  *generate() {
    yield this.done(null);
  }
}

module.exports = PageGenerator;
