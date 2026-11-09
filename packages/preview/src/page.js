// Renders one page: frontmatter, title, GitBook blocks and Markdown, into the HTML of the page body.
//
// GitBook blocks are turned into HTML comment markers with blank lines around them, so markdown-it still parses
// everything between them as one Markdown document (lists, footnotes and reference links keep working). After
// markdown-it has run, each marker is swapped for the block's real HTML.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parseBlocks, childText } from './blocks.js';
import { readFrontmatter, layoutOf } from './frontmatter.js';
import { createMarkdown } from './markdown.js';
import { escapeHtml, decodeEntities, ICONS, pageIcon } from './html.js';
import { renderApiBlock } from './openapi.js';
import { isExternal, orphanUrl } from './summary.js';

const md = createMarkdown();
const HINT_STYLES = new Set(['info', 'success', 'warning', 'danger']);
const CARD_TABLE = /<table\b[^>]*\bdata-view="cards"[^>]*>[\s\S]*?<\/table>/g;
const RAW_URL = /(\s(?:src|href|poster)=)"([^"]*)"/g;
const MAX_INCLUDE_DEPTH = 5;

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function fileUrl(relative) {
  return `/~files/${relative.split('/').map(encodeURIComponent).join('/')}`;
}

// Everything a render needs: the page's file, the site index, the spec loader, and where problems go.
export function createContext({ site, file, problems = [] }) {
  const nonce = crypto.randomBytes(4).toString('hex');
  const registry = [];
  let counter = 0;
  const ctx = {
    site,
    file,
    docsRoot: site.docsRoot,
    specs: site.specs,
    problems,
    nonce,
    registry,
    depth: 0,
    hasApiBlocks: false,
    problem(type, line, message) {
      problems.push({ type, file: ctx.file, line: line ?? null, message });
    },
    marker(html) {
      registry.push(html);
      return `<!--gbp-${nonce}-${registry.length - 1}-->`;
    },
    uid(prefix) {
      counter += 1;
      return `${prefix}-${counter}`;
    },
    markdown(text) {
      return md.render(String(text), { ctx });
    },
    resolveLink(raw, options) {
      return resolveLink(ctx, raw, options);
    },
    // The same render, reading links relative to another file (for {% include %}).
    forFile(other) {
      return { ...ctx, file: other, depth: ctx.depth + 1, problem: (t, l, m) => problems.push({ type: t, file: other, line: l ?? null, message: m }) };
    },
  };
  return ctx;
}

function resolveLink(ctx, raw, { asset = false } = {}) {
  const href = String(raw ?? '').trim();
  if (!href || href.startsWith('#')) {
    return { kind: 'anchor', href };
  }
  if (href.startsWith('/~')) {
    return { kind: 'internal', href };
  }
  const origin = ctx.site.config.url;
  if (origin && (href === origin || href.startsWith(`${origin}/`) || href.startsWith(`${origin}?`) || href.startsWith(`${origin}#`))) {
    const local = href.slice(origin.length) || '/';
    return { kind: 'page', href: local.startsWith('/') ? local : `/${local}` };
  }
  if (isExternal(href) || href.startsWith('//')) {
    return { kind: 'external', href };
  }
  if (href.startsWith('/')) {
    return { kind: 'absolute', href };
  }

  const cut = href.search(/[?#]/);
  const pathPart = cut < 0 ? href : href.slice(0, cut);
  const hash = cut < 0 ? '' : href.slice(href.indexOf('#') >= 0 ? href.indexOf('#') : href.length);
  const decoded = safeDecode(pathPart);
  let target = path.posix.normalize(path.posix.join(path.posix.dirname(ctx.file), decoded));
  if (target.startsWith('../') || target === '..') {
    ctx.problem('broken-link', null, `links outside the docs root: ${href}`);
    return { kind: 'broken', href };
  }
  const absolute = (relative) => path.join(ctx.docsRoot, relative);
  if (decoded.endsWith('/') || (fs.existsSync(absolute(target)) && fs.statSync(absolute(target)).isDirectory())) {
    target = path.posix.join(target, 'README.md');
  } else if (!/\.[A-Za-z0-9]+$/.test(target) && fs.existsSync(absolute(`${target}.md`))) {
    target = `${target}.md`;
  }

  if (/\.md$/i.test(target) && !asset) {
    const page = ctx.site.index.byFile.get(target);
    if (page) {
      return { kind: 'page', href: page.url + hash, page };
    }
    if (fs.existsSync(absolute(target))) {
      ctx.problem('not-in-summary', null, `links to ${target}, which SUMMARY.md does not list (GitBook will not publish it)`);
      return { kind: 'page', href: orphanUrl(target) + hash };
    }
    ctx.problem('broken-link', null, `links to ${target}, which does not exist`);
    return { kind: 'broken', href };
  }
  if (!fs.existsSync(absolute(target))) {
    ctx.problem('missing-file', null, `${target} is not in this checkout`);
  }
  return { kind: 'file', href: fileUrl(target) + hash };
}

// URLs inside raw HTML that the page wrote itself (<img src>, <a href>, …) are resolved like Markdown links.
function rewriteRawHtml(html, ctx) {
  return html.replace(RAW_URL, (whole, attr, value) => {
    const decoded = decodeEntities(value);
    const origin = ctx.site.config.url;
    if (!decoded || (/^(#|\/|[a-z][a-z0-9+.-]*:)/i.test(decoded) && !(origin && decoded.startsWith(origin)))) {
      return whole;
    }
    const target = ctx.resolveLink(decoded, { asset: !attr.includes('href') });
    return `${attr}"${escapeHtml(target.href)}"${target.kind === 'broken' ? ' class="broken-link"' : ''}`;
  });
}

md.renderer.rules.html_block = (tokens, idx, options, env) => (env.ctx ? rewriteRawHtml(tokens[idx].content, env.ctx) : tokens[idx].content);
md.renderer.rules.html_inline = (tokens, idx, options, env) => (env.ctx ? rewriteRawHtml(tokens[idx].content, env.ctx) : tokens[idx].content);

// --- GitBook blocks -------------------------------------------------------------------------------------------

async function container(node, ctx, open, close) {
  const inner = await emitNodes(node.children, ctx);
  return `\n${node.indent}${ctx.marker(open)}\n\n${inner}\n\n${node.indent}${ctx.marker(close)}\n\n`;
}

function leaf(node, ctx, html) {
  return `\n${node.indent}${ctx.marker(html)}\n\n`;
}

function firstLink(text) {
  const link = text.match(/\]\(\s*<?([^)\s>]+)>?/);
  return link ? link[1] : text.trim().split(/\s+/)[0] || '';
}

async function apiBlock(node, ctx, reference) {
  ctx.hasApiBlocks = true;
  const html = await renderApiBlock({ reference, method: node.attrs.method, path: node.attrs.path, node, ctx });
  return leaf(node, ctx, html);
}

const HANDLERS = {
  hint(node, ctx) {
    const style = HINT_STYLES.has(node.attrs.style) ? node.attrs.style : 'info';
    return container(node, ctx, `<div class="hint hint-${style}" role="note"><span class="hint-icon">${ICONS[style]}</span><div class="hint-body">`, '</div></div>');
  },

  tabs(node, ctx) {
    const id = ctx.uid('tabs');
    const tabs = node.children.filter((child) => child.type === 'block' && child.name === 'tab');
    tabs.forEach((tab, i) => {
      tab.tabIndex = i;
      tab.tabsId = id;
    });
    const bar = tabs
      .map(
        (tab, i) =>
          `<button type="button" role="tab" class="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}">${escapeHtml(tab.attrs.title || `Tab ${i + 1}`)}</button>`,
      )
      .join('');
    return container(node, ctx, `<div class="tabs"><div class="tabs-bar" role="tablist">${bar}</div>`, '</div>');
  },

  tab(node, ctx) {
    const i = node.tabIndex ?? 0;
    const id = node.tabsId ?? ctx.uid('tabs');
    return container(node, ctx, `<div class="tab-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}>`, '</div>');
  },

  code(node, ctx) {
    const a = node.attrs;
    const flags = [];
    if (a.overflow === 'wrap') {
      flags.push('data-wrap');
    }
    if (a.lineNumbers === 'true') {
      flags.push('data-line-numbers');
    }
    if (a.expandable === 'true') {
      flags.push('data-expandable');
    }
    if (a.fullWidth === 'true') {
      flags.push('data-full-width');
    }
    const title = a.title ? `<div class="code-title">${escapeHtml(a.title)}</div>` : '';
    return container(node, ctx, `<div class="code-wrap${a.title ? ' has-title' : ''}"${flags.map((f) => ` ${f}`).join('')}>${title}`, '</div>');
  },

  columns(node, ctx) {
    return container(node, ctx, '<div class="columns">', '</div>');
  },

  column(node, ctx) {
    const width = parseFloat(node.attrs.width);
    const style = Number.isFinite(width) ? ` style="--column-width:${width}"` : '';
    return container(node, ctx, `<div class="column"${style}>`, '</div>');
  },

  stepper(node, ctx) {
    node.children.filter((child) => child.type === 'block' && child.name === 'step').forEach((step, i) => {
      step.stepIndex = i + 1;
    });
    return container(node, ctx, '<div class="stepper">', '</div>');
  },

  step(node, ctx) {
    return container(node, ctx, `<div class="step"><span class="step-marker">${node.stepIndex ?? ''}</span><div class="step-body">`, '</div></div>');
  },

  'content-ref'(node, ctx) {
    const text = childText(node);
    const link = text.match(/\[([^\]]*)\]\(([^)]+)\)/);
    const target = ctx.resolveLink(node.attrs.url || (link && link[2]) || '');
    const title = target.page?.title || (link && link[1].replace(/\\(.)/g, '$1')) || node.attrs.url || '';
    const icon = target.page?.icon ? pageIcon(target.page.icon) : `<span class="content-ref-icon">${ICONS.page}</span>`;
    return leaf(
      node,
      ctx,
      `<a class="content-ref${target.kind === 'broken' ? ' broken-link' : ''}" href="${escapeHtml(target.href)}">${icon}<span class="content-ref-title">${escapeHtml(title)}</span><span class="content-ref-arrow">${ICONS.chevron}</span></a>`,
    );
  },

  embed(node, ctx) {
    const url = node.attrs.url || '';
    const caption = childText(node);
    const drive = url.match(/^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/);
    const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/);
    const media = url.match(/\.(mp4|webm|mov|mp3|wav|ogg|m4a)(?:[?#]|$)/i);
    let body;
    if (drive) {
      body = `<iframe src="https://drive.google.com/file/d/${drive[1]}/preview" loading="lazy" allow="autoplay" title="Google Drive file"></iframe>`;
    } else if (youtube) {
      body = `<iframe src="https://www.youtube-nocookie.com/embed/${youtube[1]}" loading="lazy" allowfullscreen title="YouTube video"></iframe>`;
    } else if (media) {
      const tag = ['mp3', 'wav', 'ogg', 'm4a'].includes(media[1].toLowerCase()) ? 'audio' : 'video';
      body = `<${tag} controls preload="metadata" src="${escapeHtml(ctx.resolveLink(url, { asset: true }).href)}"></${tag}>`;
    } else {
      let host = url;
      try {
        host = new URL(url).host;
      } catch {
        // keep the raw text
      }
      body = `<a class="embed-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${ICONS.link}<span class="embed-host">${escapeHtml(host)}</span><span class="embed-url">${escapeHtml(url)}</span></a>`;
    }
    const kind = drive || youtube ? ' embed-frame' : '';
    return leaf(node, ctx, `<figure class="embed${kind}">${body}${caption ? `<figcaption>${md.renderInline(caption, { ctx })}</figcaption>` : ''}</figure>`);
  },

  file(node, ctx) {
    const src = node.attrs.src || '';
    const target = ctx.resolveLink(src, { asset: true });
    const name = safeDecode(src.split('/').pop() || src);
    const caption = childText(node);
    return leaf(
      node,
      ctx,
      `<a class="file-card" href="${escapeHtml(target.href)}" download>${ICONS.file}<span class="file-card-name">${escapeHtml(name)}</span>${caption ? `<span class="file-card-caption">${escapeHtml(caption)}</span>` : ''}</a>`,
    );
  },

  async include(node, ctx) {
    const reference = node.attrs._ || node.attrs.src || node.attrs.path || '';
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(ctx.file), safeDecode(reference)));
    const absolute = path.join(ctx.docsRoot, target);
    if (!reference || !fs.existsSync(absolute)) {
      ctx.problem('broken-link', node.lineNo, `{% include %} points at ${target || '(nothing)'}, which does not exist`);
      return '';
    }
    if (ctx.depth >= MAX_INCLUDE_DEPTH) {
      ctx.problem('include-depth', node.lineNo, `{% include %} nests deeper than ${MAX_INCLUDE_DEPTH} files`);
      return '';
    }
    const included = readFrontmatter(fs.readFileSync(absolute, 'utf8'));
    const sub = ctx.forFile(target);
    const { root, problems } = parseBlocks(included.body, included.lines + 1);
    problems.forEach((p) => sub.problem(p.type, p.line, p.message));
    return `\n${await emitNodes(root.children, sub)}\n`;
  },

  'openapi-operation'(node, ctx) {
    return apiBlock(node, ctx, firstLink(childText(node)));
  },

  openapi(node, ctx) {
    return apiBlock(node, ctx, node.attrs.src || firstLink(childText(node)));
  },

  swagger(node, ctx) {
    return apiBlock(node, ctx, node.attrs.src || firstLink(childText(node)));
  },
};

function renderCards(table, ctx) {
  const heads = [...table.matchAll(/<th\b([^>]*)>/g)].map((m) => m[1]);
  const coverColumn = heads.findIndex((attrs) => /data-card-cover/.test(attrs));
  const targetColumn = heads.findIndex((attrs) => /data-card-target/.test(attrs));
  const hidden = heads.map((attrs) => /\bdata-hidden\b/.test(attrs));
  const body = table.replace(/<thead[\s\S]*?<\/thead>/, '');
  const rows = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)].map((row) => [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1]));
  const hrefIn = (cell) => (cell ? (cell.match(/href="([^"]*)"/) || cell.match(/src="([^"]*)"/) || [])[1] : null);
  const cards = rows.map((cells) => {
    const target = hrefIn(cells[targetColumn]);
    const cover = hrefIn(cells[coverColumn]);
    const texts = cells.filter((cell, i) => i !== coverColumn && i !== targetColumn && !hidden[i] && cell.trim());
    const inner =
      (cover ? `<img class="card-cover" src="${escapeHtml(ctx.resolveLink(decodeEntities(cover), { asset: true }).href)}" alt="" loading="lazy">` : '') +
      `<div class="card-body">${texts.map((t) => `<div class="card-text">${rewriteRawHtml(t, ctx)}</div>`).join('')}</div>`;
    return target ? `<a class="card" href="${escapeHtml(ctx.resolveLink(decodeEntities(target)).href)}">${inner}</a>` : `<div class="card">${inner}</div>`;
  });
  return `<div class="cards">${cards.join('')}</div>`;
}

async function emitNodes(nodes, ctx) {
  const parts = [];
  for (const node of nodes) {
    if (node.type === 'text') {
      parts.push(node.lines.join('\n').replace(CARD_TABLE, (table) => `\n${ctx.marker(renderCards(table, ctx))}\n\n`));
      continue;
    }
    const handler = HANDLERS[node.name];
    if (handler) {
      parts.push(await handler(node, ctx));
      continue;
    }
    ctx.problem('unknown-block', node.lineNo, `the preview does not know the GitBook block {% ${node.name} %}`);
    const open =
      `<div class="unknown-block"><div class="unknown-block-title">${ICONS.alert}` +
      `<span>The preview cannot draw the GitBook block <code>{% ${escapeHtml(node.name)} %}</code>; its content follows.</span></div>`;
    parts.push(node.leaf ? leaf(node, ctx, `${open}</div>`) : await container(node, ctx, open, '</div>'));
  }
  return parts.join('\n');
}

// --- the page -------------------------------------------------------------------------------------------------

export async function renderPage(site, file) {
  const problems = [];
  const ctx = createContext({ site, file, problems });
  const source = fs.readFileSync(path.join(site.docsRoot, file), 'utf8');
  const frontmatter = readFrontmatter(source);
  if (frontmatter.error) {
    ctx.problem('frontmatter', 1, `the frontmatter is not valid YAML: ${frontmatter.error}`);
  }

  // The first line of a GitBook page is its title. It is blanked, not removed, so line numbers stay right.
  const lines = frontmatter.body.split('\n');
  let title = null;
  const first = lines.findIndex((line) => line.trim() !== '');
  if (first >= 0 && /^#\s+/.test(lines[first])) {
    title = lines[first].replace(/^#\s+/, '').replace(/\s+#*\s*$/, '');
    lines[first] = '';
  }

  const { root, problems: blockProblems } = parseBlocks(lines.join('\n'), frontmatter.lines + 1);
  blockProblems.forEach((p) => ctx.problem(p.type, p.line, p.message));
  const markdown = await emitNodes(root.children, ctx);
  const env = { ctx };
  let html = md.render(markdown, env);
  const markers = new RegExp(`<!--gbp-${ctx.nonce}-(\\d+)-->\\n?`, 'g');
  // Markers can sit inside other markers' HTML (a hint inside a tab), so swap until none are left.
  for (let pass = 0; pass < 10 && markers.test(html); pass += 1) {
    markers.lastIndex = 0;
    html = html.replace(markers, (_, n) => ctx.registry[Number(n)]);
  }

  const data = frontmatter.data;
  return {
    file,
    title,
    titleHtml: title ? md.renderInline(title, { ctx }) : null,
    description: typeof data.description === 'string' ? data.description : '',
    icon: typeof data.icon === 'string' ? data.icon : null,
    hidden: data.hidden === true,
    layout: layoutOf(data),
    html,
    outline: env.outline || [],
    hasApiBlocks: ctx.hasApiBlocks,
    problems,
  };
}
