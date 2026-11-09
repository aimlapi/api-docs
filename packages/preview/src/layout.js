// The page around the content: header, sidebar from SUMMARY.md, breadcrumbs, outline and pagination,
// laid out like docs.aimlapi.com.

import { escapeHtml, ICONS, pageIcon } from './html.js';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap';
const FONT_AWESOME = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';

// Runs before first paint, so a dark theme never flashes light.
const THEME_BOOT = `try{var t=localStorage.getItem('docs-preview-theme')||'system';document.documentElement.dataset.theme=t==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):t;document.documentElement.dataset.themeChoice=t}catch(e){}`;

function isOnPath(node, current) {
  for (let n = current; n; n = n.parent) {
    if (n === node) {
      return true;
    }
  }
  return false;
}

function navItem(node, current) {
  if (node.hidden) {
    return '';
  }
  const children = node.children.filter((child) => !child.hidden);
  const open = current && isOnPath(node, current);
  const icon = pageIcon(node.icon);
  const label = `${icon}<span class="nav-label">${escapeHtml(node.title)}</span>`;
  let link;
  if (node.external) {
    link = `<a class="nav-link" href="${escapeHtml(node.external)}" target="_blank" rel="noreferrer">${label}<span class="nav-external">${ICONS.external}</span></a>`;
  } else {
    const missing = node.exists === false ? ' missing' : '';
    const active = node === current ? ' active" aria-current="page' : '';
    link = `<a class="nav-link${missing}${active}" href="${escapeHtml(node.url)}">${label}</a>`;
  }
  const toggle = children.length
    ? `<button type="button" class="nav-toggle" aria-label="Toggle ${escapeHtml(node.title)}" aria-expanded="${open ? 'true' : 'false'}">${ICONS.chevron}</button>`
    : '';
  const list = children.length ? `<ul class="nav-list">${children.map((child) => navItem(child, current)).join('')}</ul>` : '';
  return `<li class="nav-item${open ? ' open' : ''}${children.length ? ' has-children' : ''}"><div class="nav-row">${link}${toggle}</div>${list}</li>`;
}

function sidebar(index, current) {
  return index.groups
    .map((group) => {
      const items = group.items.map((node) => navItem(node, current)).join('');
      if (!items) {
        return '';
      }
      const title = group.title ? `<div class="nav-group-title">${escapeHtml(group.title)}</div>` : '';
      return `<div class="nav-group">${title}<ul class="nav-list">${items}</ul></div>`;
    })
    .join('');
}

function breadcrumbs(node) {
  if (!node) {
    return '';
  }
  const crumbs = [];
  for (let n = node.parent; n; n = n.parent) {
    crumbs.unshift(`<a href="${escapeHtml(n.url || '#')}">${pageIcon(n.icon)}${escapeHtml(n.title)}</a>`);
  }
  if (node.group?.title) {
    crumbs.unshift(`<span class="crumb-group">${escapeHtml(node.group.title)}</span>`);
  }
  return crumbs.length ? `<nav class="breadcrumbs" aria-label="Breadcrumbs">${crumbs.join(`<span class="crumb-sep">${ICONS.chevron}</span>`)}</nav>` : '';
}

function pagination(index, node) {
  if (!node) {
    return '';
  }
  const at = index.order.indexOf(node);
  if (at < 0) {
    return '';
  }
  const prev = index.order[at - 1];
  const next = index.order[at + 1];
  const card = (target, dir) =>
    target
      ? `<a class="pager pager-${dir}" href="${escapeHtml(target.url)}">${dir === 'prev' ? ICONS.arrowLeft : ''}<span><span class="pager-dir">${dir === 'prev' ? 'Previous' : 'Next'}</span><span class="pager-title">${escapeHtml(target.title)}</span></span>${dir === 'next' ? ICONS.arrowRight : ''}</a>`
      : '<span></span>';
  return `<nav class="pagination">${card(prev, 'prev')}${card(next, 'next')}</nav>`;
}

function outline(items) {
  if (!items.length) {
    return '';
  }
  const links = items.map((h) => `<li class="outline-level-${h.level}"><a href="#${escapeHtml(h.id)}">${escapeHtml(h.text)}</a></li>`).join('');
  return `<aside class="outline"><div class="outline-inner"><div class="outline-title">On this page</div><ul>${links}</ul></div></aside>`;
}

function problemsPanel(problems) {
  if (!problems.length) {
    return '';
  }
  const rows = problems
    .map((p) => `<li><span class="problem-type">${escapeHtml(p.type)}</span>${p.line ? `<span class="problem-line">line ${p.line}</span>` : ''}<span>${escapeHtml(p.message)}</span></li>`)
    .join('');
  return (
    `<details class="preview-problems"><summary>${ICONS.alert}<span>${problems.length} preview ${problems.length === 1 ? 'warning' : 'warnings'} on this page</span></summary>` +
    `<ul>${rows}</ul></details>`
  );
}

function header(config) {
  const links = (config.links || [])
    .map((l) => `<a class="header-link" href="${escapeHtml(l.url)}" target="_blank" rel="noreferrer">${escapeHtml(l.title)}</a>`)
    .join('');
  return (
    '<header class="site-header"><div class="site-header-inner">' +
    '<button type="button" class="menu-button" aria-label="Open table of contents"><span></span><span></span><span></span></button>' +
    `<a class="site-logo" href="/">${ICONS.logo}<span>${escapeHtml(config.title)}</span></a>` +
    `<div class="search"><span class="search-icon">${ICONS.search}</span><input type="search" placeholder="Search…" aria-label="Search pages" autocomplete="off" spellcheck="false"><kbd>⌘K</kbd><div class="search-results" hidden></div></div>` +
    `<nav class="header-links">${links}</nav>` +
    '<span class="preview-badge" title="Rendered on this computer from your checkout. Nothing here is published.">Local preview</span>' +
    '</div></header>'
  );
}

const themeSwitch = () =>
  '<div class="theme-switch" role="group" aria-label="Theme">' +
  `<button type="button" data-theme-choice="light" aria-label="Light">${ICONS.sun}</button>` +
  `<button type="button" data-theme-choice="system" aria-label="System">${ICONS.monitor}</button>` +
  `<button type="button" data-theme-choice="dark" aria-label="Dark">${ICONS.moon}</button>` +
  '</div>';

export function renderDocument({ site, node, page, status = 200 }) {
  const { config, index } = site;
  const layout = page?.layout || { wide: false, title: true, description: true, tableOfContents: true, outline: true, pagination: true };
  const wide = layout.wide || page?.hasApiBlocks;
  // GitBook titles a listed page with its SUMMARY.md label (tab title and heading), not with the file's own `# H1`.
  const title = node?.title || page?.title || 'Page not found';
  const notes = [];
  if (page && node === null && status === 200) {
    notes.push('This page is not listed in SUMMARY.md, so GitBook will not publish it. It is shown here so you can preview it before you list it.');
  }
  if (page?.hidden) {
    notes.push('This page is hidden (<code>hidden: true</code>): GitBook publishes it but leaves it out of the table of contents.');
  }
  const noteHtml = notes.map((n) => `<div class="hint hint-info preview-note" role="note"><span class="hint-icon">${ICONS.info}</span><div class="hint-body"><p>${n}</p></div></div>`).join('');

  let main;
  if (page) {
    main =
      '<div class="page-header">' +
      breadcrumbs(node) +
      (layout.title ? `<h1 class="page-title">${pageIcon(page.icon)}<span>${node ? escapeHtml(node.title) : page.titleHtml || escapeHtml(title)}</span></h1>` : '') +
      (layout.description && page.description ? `<p class="page-description">${escapeHtml(page.description)}</p>` : '') +
      '</div>' +
      noteHtml +
      `<div class="markdown">${page.html}</div>` +
      problemsPanel(page.problems) +
      (layout.pagination ? pagination(index, node) : '');
  } else {
    main =
      '<div class="page-header"><h1 class="page-title">Page not found</h1>' +
      `<p class="page-description">No page in SUMMARY.md lives at this address, and no Markdown file maps to it.</p></div>`;
  }

  const bodyClass = [wide ? 'layout-wide' : '', layout.tableOfContents ? '' : 'no-sidebar'].filter(Boolean).join(' ');
  return (
    '<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    `<title>${escapeHtml(title)} | ${escapeHtml(config.title)} (local preview)</title>` +
    `<script>${THEME_BOOT}</script>` +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    `<link rel="stylesheet" href="${FONTS}"><link rel="stylesheet" href="${FONT_AWESOME}">` +
    '<link rel="stylesheet" href="/~preview/style.css">' +
    `</head><body class="${bodyClass}">` +
    header(config) +
    '<div class="site-body">' +
    `<aside class="sidebar"><div class="sidebar-panel"><nav class="nav">${sidebar(index, node)}</nav></div></aside>` +
    `<main class="page">${main}</main>` +
    (page && layout.outline && !wide ? outline(page.outline) : '<div class="outline-spacer"></div>') +
    '</div>' +
    themeSwitch() +
    '<script src="/~preview/client.js" defer></script>' +
    '</body></html>'
  );
}
