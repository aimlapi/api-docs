const Handlebars = require('handlebars');
const PageGenerator = require('./page');

class HandlebarsPageGenerator extends PageGenerator {
  *generate() {
    yield this.done({ ...this.config, content: Handlebars.compile(this.config.content)(this.config) });
  }
}

module.exports = HandlebarsPageGenerator;
