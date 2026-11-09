// Reads docs/SUMMARY.md the way GitBook does: groups, the page tree, and each page's URL.
//
// GitBook's URL rule (checked against all 849 URLs of docs.aimlapi.com's sitemap):
// - a top-level page lives at its file path:        quickstart/simple-model/README.md -> /quickstart/simple-model
// - a nested page lives under its parent page:      parent URL + "/" + the file's own name
//                                                   (AI/ML-API/dynamic-router.md under "AI/ML API" -> .../ml-api/dynamic-router)
// - names are lower-cased, characters other than letters, digits, ".", "_", "~" and "-" are dropped,
//   and a URL that is already taken gets "-1", "-2", … appended.

import fs from 'node:fs';
import path from 'node:path';
import { readFrontmatter } from './frontmatter.js';

const ITEM = /^(\s*)[*+-]\s+\[(.*)\]\((.*)\)\s*$/;
const GROUP = /^##\s+(.*)$/;

export function slugify(segment) {
  return segment
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}._~-]+/gu, '')
    .replace(/-{2,}/g, '-');
}

// The link destination of a SUMMARY item: drop a "title", unwrap <…>, undo Markdown escapes and %-encoding.
export function linkTarget(raw) {
  let target = raw.trim();
  const titled = target.match(/^(\S+|<[^>]*>)\s+(".*"|'.*')$/);
  if (titled) {
    target = titled[1];
  }
  if (target.startsWith('<') && target.endsWith('>')) {
    target = target.slice(1, -1);
  }
  target = target.replace(/\\([!-/:-@[-`{-~])/g, '$1');
  try {
    return decodeURI(target);
  } catch {
    return target;
  }
}

export function isExternal(href) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

// "quickstart/simple-model/README.md" -> "quickstart/simple-model"; "faq.md" -> "faq"; "README.md" -> "".
export function pagePath(file) {
  let p = file.replace(/\.md$/i, '');
  if (p === 'README' || p.endsWith('/README')) {
    p = p.slice(0, -'README'.length).replace(/\/$/, '');
  }
  return p;
}

function plainText(markdown) {
  return markdown
    .replace(/<[^>]+>/g, '')
    .replace(/\\([!-/:-@[-`{-~])/g, '$1')
    .trim();
}

export function parseSummary(source) {
  const groups = [];
  const nodes = [];
  let group = null;
  let stack = [];

  for (const line of source.split(/\r?\n/)) {
    const heading = line.match(GROUP);
    if (heading) {
      group = { title: plainText(heading[1]), items: [] };
      groups.push(group);
      stack = [];
      continue;
    }
    const item = line.match(ITEM);
    if (!item) {
      continue;
    }
    if (!group) {
      group = { title: '', items: [] };
      groups.push(group);
    }
    const indent = item[1].replace(/\t/g, '    ').length;
    while (stack.length && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const parent = stack.length ? stack[stack.length - 1] : null;
    const target = linkTarget(item[3]);
    const node = {
      title: plainText(item[2]),
      group,
      parent,
      children: [],
      indent,
      external: isExternal(target) ? target : null,
      file: isExternal(target) ? null : path.posix.normalize(target.replace(/^\.\//, '')),
    };
    (parent ? parent.children : group.items).push(node);
    nodes.push(node);
    stack.push(node);
  }

  const taken = new Set();
  for (const node of nodes) {
    if (node.external) {
      continue;
    }
    const own = pagePath(node.file);
    let url;
    if (node.parent && !node.parent.external) {
      const last = own.split('/').pop();
      url = `${node.parent.url.replace(/\/$/, '')}/${slugify(last)}`;
    } else {
      url = `/${own.split('/').filter(Boolean).map(slugify).join('/')}`;
    }
    let unique = url;
    for (let n = 1; taken.has(unique); n += 1) {
      unique = `${url}-${n}`;
    }
    taken.add(unique);
    node.url = unique;
  }
  return { groups, nodes };
}

// Everything the site needs to know about its pages, rebuilt whenever SUMMARY.md or a page's frontmatter changes.
export function buildIndex(docsRoot) {
  const summaryFile = path.join(docsRoot, 'SUMMARY.md');
  const source = fs.existsSync(summaryFile) ? fs.readFileSync(summaryFile, 'utf8') : '';
  const { groups, nodes } = parseSummary(source);
  const byUrl = new Map();
  const byFile = new Map();
  const order = [];

  for (const node of nodes) {
    if (node.external) {
      continue;
    }
    const absolute = path.join(docsRoot, node.file);
    node.exists = fs.existsSync(absolute);
    const meta = node.exists ? readFrontmatter(fs.readFileSync(absolute, 'utf8')).data : {};
    node.hidden = meta.hidden === true;
    node.icon = typeof meta.icon === 'string' ? meta.icon : null;
    node.description = typeof meta.description === 'string' ? meta.description : '';
    byUrl.set(node.url, node);
    if (!byFile.has(node.file)) {
      byFile.set(node.file, node);
    }
    if (!node.hidden && !isHiddenByAncestor(node)) {
      order.push(node);
    }
  }
  return { groups, nodes, byUrl, byFile, order, summaryFound: source !== '' };
}

function isHiddenByAncestor(node) {
  for (let p = node.parent; p; p = p.parent) {
    if (p.hidden) {
      return true;
    }
  }
  return false;
}

// A page that exists but is not in SUMMARY.md still gets a URL, so it can be previewed before it is listed.
export function orphanUrl(file) {
  return `/${pagePath(file).split('/').filter(Boolean).map(slugify).join('/')}`;
}
