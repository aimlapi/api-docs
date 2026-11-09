#!/usr/bin/env node
// Renders the docs of a GitBook-synced repo locally: `pnpm preview` from the repo root.

import { parseArgs } from 'node:util';
import { findRepoRoot, createSite, caseCollisions } from '../src/site.js';
import { startServer } from '../src/server.js';
import { runCheck } from '../src/check.js';

const HELP = `Usage: docs-preview [repo-dir] [options]

Renders the docs in repo-dir (default: the current directory) the way docs.aimlapi.com
shows them, and reloads the browser whenever a file changes. Nothing is published,
and nothing in the checkout is written.

Options:
  -p, --port <n>   port to listen on (default 4000; the next free one if taken)
      --host <h>   address to listen on (default 127.0.0.1)
      --offline    do not fetch API specs that live outside the checkout
      --check      render every page once, report problems, and exit
      --verbose    with --check: list every problem, including missing images
  -h, --help       show this help`;

let options;
try {
  options = parseArgs({
    allowPositionals: true,
    options: {
      port: { type: 'string', short: 'p', default: '4000' },
      host: { type: 'string', default: '127.0.0.1' },
      offline: { type: 'boolean', default: false },
      check: { type: 'boolean', default: false },
      verbose: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });
} catch (e) {
  console.error(`${e.message}\n\n${HELP}`);
  process.exit(2);
}
const { values, positionals } = options;
if (values.help) {
  console.log(HELP);
  process.exit(0);
}

const repoRoot = findRepoRoot(positionals[0] || process.cwd());
if (!repoRoot) {
  console.error(`No .gitbook.yaml in ${positionals[0] || process.cwd()} or above it. Run this from the docs repo.`);
  process.exit(2);
}
const site = createSite({ repoRoot, offline: values.offline });
if (!site.index.summaryFound) {
  console.error(`No SUMMARY.md in ${site.docsRoot}.`);
  process.exit(2);
}

const collisions = caseCollisions(site);
if (collisions.length) {
  console.warn(
    `Warning: ${collisions.length} pairs of docs files differ only in letter case, e.g. ${collisions[0].join(' and ')}.\n` +
      'This file system keeps one file of each pair: the preview shows that one, and `git status` lists the others as modified.\n' +
      'Do not commit those files from this checkout: `git add` only the files you changed.\n',
  );
}

if (values.check) {
  const { problems } = await runCheck(site, { verbose: values.verbose });
  process.exit(problems.some((p) => p.type === 'render-error') ? 1 : 0);
}

const port = Number(values.port);
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  console.error(`--port must be a port number, not ${values.port}`);
  process.exit(2);
}
const { url, close } = await startServer(site, { port, host: values.host });
console.log(`Docs preview: ${url}`);
console.log(`Serving ${site.docsRoot} (${site.index.byUrl.size} pages). Edits reload the browser. Ctrl+C stops.`);
const stop = () => close().then(() => process.exit(0));
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
