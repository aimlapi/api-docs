// The local web server: pages, files from the checkout, the preview's own CSS/JS, search, and live reload.
// It listens on 127.0.0.1 by default and serves reads only.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from './page.js';
import { renderDocument } from './layout.js';
import { orphans, redirectFor } from './site.js';
import { escapeHtml } from './html.js';

const ASSETS = fileURLToPath(new URL('../assets/', import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};
const IMAGE = /\.(png|jpe?g|gif|svg|webp|avif)$/i;

function missingImage(name) {
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="120" viewBox="0 0 480 120">' +
    '<rect width="480" height="120" rx="8" fill="#f6f7fa" stroke="#e1e6ec"/>' +
    '<text x="240" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#686f77">Image not in this checkout</text>' +
    `<text x="240" y="78" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" fill="#9aa1a9">${escapeHtml(name.slice(-60))}</text></svg>`
  );
}

function send(res, status, type, body, extra = {}) {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', ...extra });
  res.end(body);
}

function searchIndex(site) {
  const crumbs = (node) => {
    const parts = [];
    for (let n = node.parent; n; n = n.parent) {
      parts.unshift(n.title);
    }
    if (node.group?.title) {
      parts.unshift(node.group.title);
    }
    return parts.join(' › ');
  };
  return site.index.nodes.filter((n) => !n.external && !n.hidden).map((n) => ({ t: n.title, u: n.url, p: crumbs(n) }));
}

async function pageFor(site, url) {
  const node = site.index.byUrl.get(url) || site.index.byUrl.get(url.toLowerCase());
  if (node) {
    if (!node.exists) {
      const page = {
        title: node.title,
        html: `<p>SUMMARY.md lists <code>${escapeHtml(node.file)}</code>, but that file is not in this checkout.</p>`,
        problems: [{ type: 'missing-page', file: 'SUMMARY.md', line: null, message: `${node.file} does not exist` }],
        outline: [],
        layout: { wide: false, title: true, description: true, tableOfContents: true, outline: true, pagination: true },
      };
      return { status: 404, html: renderDocument({ site, node, page }) };
    }
    return { status: 200, html: renderDocument({ site, node, page: await renderPage(site, node.file) }) };
  }
  const orphan = orphans(site).get(url) || orphans(site).get(url.toLowerCase());
  if (orphan) {
    return { status: 200, html: renderDocument({ site, node: null, page: await renderPage(site, orphan) }) };
  }
  return { status: 404, html: renderDocument({ site, node: null, page: null, status: 404 }) };
}

function serveFile(res, root, relative) {
  const base = path.resolve(root);
  const absolute = path.resolve(base, relative);
  if (!absolute.startsWith(base + path.sep)) {
    return send(res, 403, 'text/plain; charset=utf-8', 'Outside the docs root');
  }
  if (!fs.existsSync(absolute) || fs.statSync(absolute).isDirectory()) {
    return IMAGE.test(relative)
      ? send(res, 404, 'image/svg+xml', missingImage(relative))
      : send(res, 404, 'text/plain; charset=utf-8', `${relative} is not in this checkout`);
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(absolute).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(absolute).pipe(res);
  return undefined;
}

export function startServer(site, { port, host, log = console.log }) {
  const clients = new Set();

  const server = http.createServer(async (req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      return send(res, 400, 'text/plain; charset=utf-8', 'Bad URL');
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return send(res, 405, 'text/plain; charset=utf-8', 'The preview only serves reads');
    }
    try {
      if (pathname === '/~preview/events') {
        res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
        res.write('retry: 1000\n\n');
        clients.add(res);
        req.on('close', () => clients.delete(res));
        return undefined;
      }
      if (pathname === '/~preview/search.json') {
        return send(res, 200, TYPES['.json'], JSON.stringify(searchIndex(site)));
      }
      if (pathname.startsWith('/~preview/')) {
        return serveFile(res, ASSETS, pathname.slice('/~preview/'.length));
      }
      if (pathname.startsWith('/~files/')) {
        return serveFile(res, site.docsRoot, pathname.slice('/~files/'.length));
      }
      if (pathname === '/favicon.ico') {
        return send(res, 204, 'image/x-icon', '');
      }
      const url = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
      const redirect = redirectFor(site, url);
      if (redirect) {
        res.writeHead(302, { Location: redirect });
        return res.end();
      }
      const { status, html } = await pageFor(site, url);
      return send(res, status, TYPES['.html'], html);
    } catch (e) {
      log(`! ${pathname}: ${e.stack}`);
      return send(res, 500, TYPES['.html'], `<!doctype html><title>Preview error</title><h1>The preview failed on ${escapeHtml(pathname)}</h1><pre>${escapeHtml(e.stack)}</pre>`);
    }
  });

  const reload = () => {
    for (const client of clients) {
      client.write('event: reload\ndata: {}\n\n');
    }
  };
  const ping = setInterval(() => {
    for (const client of clients) {
      client.write(': ping\n\n');
    }
  }, 25000);
  ping.unref();

  let timer = null;
  let indexStale = false;
  const changed = (filename) => {
    if (filename && /(^|[\\/])(node_modules|\.git)([\\/]|$)/.test(filename)) {
      return;
    }
    indexStale ||= !filename || filename.endsWith('.md');
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (indexStale) {
        site.refresh();
        indexStale = false;
      }
      site.specs.clearLocal();
      reload();
    }, 120);
  };
  const watchers = [];
  for (const dir of [site.docsRoot, ASSETS]) {
    try {
      watchers.push(fs.watch(dir, { recursive: true }, (event, filename) => changed(filename && String(filename))));
    } catch (e) {
      log(`Live reload is off for ${dir}: ${e.message}`);
    }
  }

  return new Promise((resolve, reject) => {
    let attempt = 0;
    const tryListen = () => {
      server.once('error', (e) => {
        if (e.code === 'EADDRINUSE' && attempt < 20) {
          attempt += 1;
          tryListen();
        } else {
          reject(e);
        }
      });
      server.listen(port + attempt, host, () => {
        const address = server.address();
        resolve({
          server,
          url: `http://${host.includes(':') ? `[${host}]` : host}:${address.port}`,
          close: () => {
            watchers.forEach((w) => w.close());
            clearInterval(ping);
            for (const client of clients) {
              client.end();
            }
            return new Promise((done) => server.close(done));
          },
        });
      });
    };
    tryListen();
  });
}
