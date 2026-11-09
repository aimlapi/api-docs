// `--check`: renders every page SUMMARY.md lists and reports what the preview found wrong,
// without starting a server. It reads the checkout and writes nothing.

import { renderPage } from './page.js';

const EXPLAIN = {
  'missing-page': 'SUMMARY.md lists a file that does not exist',
  'broken-link': 'links to a page or file that does not exist',
  'not-in-summary': 'links to a page SUMMARY.md does not list',
  'missing-file': 'images and other files not in this checkout',
  openapi: 'API blocks whose spec or operation cannot be loaded',
  'unknown-block': 'GitBook blocks the preview cannot draw',
  'unclosed-block': 'blocks without their end tag',
  'stray-end': 'end tags without a block',
  frontmatter: 'frontmatter that is not valid YAML',
  'include-depth': 'includes nested too deep',
  'render-error': 'pages the preview failed to render',
};

export async function runCheck(site, { verbose = false, log = console.log } = {}) {
  const started = Date.now();
  const problems = [];
  let rendered = 0;
  const done = new Set();
  for (const node of site.index.nodes) {
    if (node.external || done.has(node.file)) {
      continue;
    }
    done.add(node.file);
    if (!node.exists) {
      problems.push({ type: 'missing-page', file: 'SUMMARY.md', line: null, message: `${node.file} does not exist` });
      continue;
    }
    try {
      const page = await renderPage(site, node.file);
      problems.push(...page.problems);
      rendered += 1;
    } catch (e) {
      problems.push({ type: 'render-error', file: node.file, line: null, message: e.stack });
    }
  }

  const counts = new Map();
  for (const p of problems) {
    counts.set(p.type, (counts.get(p.type) || 0) + 1);
  }
  log(`Rendered ${rendered} pages in ${((Date.now() - started) / 1000).toFixed(1)} s.`);
  if (!problems.length) {
    log('No problems found.');
    return { problems, rendered };
  }
  for (const [type, count] of [...counts].sort((a, b) => b[1] - a[1])) {
    log(`  ${String(count).padStart(6)}  ${type.padEnd(16)} ${EXPLAIN[type] || ''}`);
  }
  const listed = problems.filter((p) => verbose || p.type !== 'missing-file');
  if (listed.length) {
    log('');
    for (const p of listed.slice(0, verbose ? Infinity : 200)) {
      log(`${p.file}${p.line ? `:${p.line}` : ''}  ${p.type}  ${p.message}`);
    }
    if (!verbose && listed.length > 200) {
      log(`… and ${listed.length - 200} more (--verbose lists all).`);
    }
  }
  return { problems, rendered };
}
