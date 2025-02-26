const PageGenerator = require('./common/page');

class CustomGenerator extends PageGenerator {
  static create({ generate, ...rest }) {
    const created = CustomGenerator.build(rest);
    created.generate = generate.bind(created);

    return created;
  }
}

module.exports = CustomGenerator;
