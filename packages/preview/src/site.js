// The site being previewed: where the docs live (from .gitbook.yaml), the page index, and the spec loader.
// The preview only ever reads the checkout; it never writes into it.

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';
import { buildIndex, orphanUrl, pagePath, slugify } from './summary.js';
import { SpecLoader } from './openapi.js';

const CONFIG_FILE = new URL('../site.json', import.meta.url);

export function findRepoRoot(start) {
  for (let dir = path.resolve(start); ; dir = path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.gitbook.yaml'))) {
      return dir;
    }
    if (dir === path.dirname(dir)) {
      return null;
    }
  }
}

export function readGitbookConfig(repoRoot) {
  const raw = yaml.load(fs.readFileSync(path.join(repoRoot, '.gitbook.yaml'), 'utf8')) || {};
  return {
    docsRoot: path.resolve(repoRoot, typeof raw.root === 'string' ? raw.root : './'),
    redirects: raw.redirects && typeof raw.redirects === 'object' ? raw.redirects : {},
  };
}

export function createSite({ repoRoot, offline = false }) {
  const { docsRoot, redirects } = readGitbookConfig(repoRoot);
  const site = {
    repoRoot,
    docsRoot,
    redirects,
    config: JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')),
    specs: new SpecLoader({ repoRoot, offline }),
    index: buildIndex(docsRoot),
    orphans: null,
  };
  site.refresh = () => {
    site.index = buildIndex(docsRoot);
    site.orphans = null;
  };
  return site;
}

// Markdown files that SUMMARY.md does not list, by the URL they would get.
export function orphans(site) {
  if (site.orphans) {
    return site.orphans;
  }
  const found = new Map();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue;
      }
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(absolute);
      } else if (entry.name.endsWith('.md') && entry.name !== 'SUMMARY.md') {
        const file = path.relative(site.docsRoot, absolute).split(path.sep).join('/');
        if (!site.index.byFile.has(file)) {
          found.set(orphanUrl(file), file);
        }
      }
    }
  };
  walk(site.docsRoot);
  site.orphans = found;
  return found;
}

// Tracked docs files whose paths differ only in letter case (Google/x.md and google/x.md). A case-insensitive
// file system (macOS, Windows) holds one of each, so the preview shows that one and `git status` reports the
// others as modified; committing them from such a checkout would overwrite the published pages.
export function caseCollisions(site) {
  const probe = path.join(site.docsRoot, 'SUMMARY.md');
  const caseInsensitive = fs.existsSync(probe) && fs.existsSync(path.join(site.docsRoot, 'summary.md'));
  if (!caseInsensitive) {
    return [];
  }
  let files;
  try {
    files = execFileSync('git', ['-C', site.repoRoot, 'ls-files', '-z', '--', path.relative(site.repoRoot, site.docsRoot) || '.'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      maxBuffer: 64 * 1024 * 1024,
    }).split('\0').filter(Boolean);
  } catch {
    return [];
  }
  const groups = new Map();
  for (const file of files) {
    const key = file.toLowerCase();
    groups.set(key, [...(groups.get(key) || []), file]);
  }
  return [...groups.values()].filter((group) => group.length > 1);
}

// .gitbook.yaml redirects: `old/path: new/file.md` sends /old/path to the page of new/file.md.
export function redirectFor(site, url) {
  const wanted = url.replace(/^\//, '');
  for (const [from, to] of Object.entries(site.redirects)) {
    const source = String(from).replace(/^\//, '').replace(/\/$/, '');
    if (source === wanted || pagePath(source).split('/').map(slugify).join('/') === wanted) {
      const page = site.index.byFile.get(String(to).replace(/^\.?\//, ''));
      return page ? page.url : null;
    }
  }
  return null;
}
