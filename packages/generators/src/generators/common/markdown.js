const PathPlugin = require('../plugins/path');
const StorePlugin = require('../plugins/store');
const PageGenerator = require('./page');

class MarkdownPageWriter extends PageGenerator {
  *generate() {
    // yield this.done(
    //   this.config,
    //   StorePlugin.store((...args) => ({ path: `${PathPlugin.path(...args)}.md`, transform: this.config.transform })),
    // );
  }
}

module.exports = MarkdownPageWriter;
