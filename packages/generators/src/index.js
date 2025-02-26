const path = require('path');
const _ = require('lodash');
const { Command } = require('commander');

const { root } = require('./root');
const PathPlugin = require('./generators/plugins/path');

const generate = (ctx) => {
  PathPlugin.locate(root.plugins).update(ctx, { root: ctx.path, path: '/' });

  const step = async (ctx, iterable = [root]) => {
    for await (const item of iterable) {
      const updated = { plugins: root.plugins, ..._.cloneDeep(ctx) };

      for (const applier of item.effects || []) {
        await applier(updated, item.next?.config ?? {});
      }

      if (!item.next) {
        continue;
      }

      if (Array.isArray(item.next)) {
        for (const next of item.next) {
          await step(updated, next.generate());
        }
      } else {
        await step(updated, item.next.generate());
      }
    }
  };

  step(ctx);
};

const program = new Command();

program
  .command('generate')
  .argument('<string>', 'output path')
  .action((output) => generate({ path: path.resolve(__dirname, output) }));

program.parse();
