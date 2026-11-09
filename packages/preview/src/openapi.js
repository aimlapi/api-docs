// GitBook's API blocks: {% openapi-operation spec="…" path="…" method="…" %}, {% openapi src=… %}, {% swagger src=… %}.
// The spec is read from the local checkout whenever the block points at a file in this repo
// (raw.githubusercontent.com/<owner>/<repo>/<branch>/<path> or a relative path), so a spec edit shows up at once.
// Anything else is fetched over the network, unless the preview runs with --offline.

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { escapeHtml } from './html.js';
import { renderCode } from './markdown.js';

const REMOTE_TTL_MS = 10 * 60 * 1000;
const MAX_DEPTH = 8;
const MAX_ENUM = 40;
const METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'];

export class SpecLoader {
  constructor({ repoRoot, offline }) {
    this.repoRoot = repoRoot;
    this.offline = offline;
    this.local = new Map();
    this.remote = new Map();
  }

  clearLocal() {
    this.local.clear();
  }

  // Where a block's spec lives: { file } inside the repo, { url } elsewhere, or { missing } with a reason.
  locate(reference, pageFile, docsRoot) {
    if (!reference) {
      return { missing: 'the block names no spec source' };
    }
    if (reference.startsWith('/broken/')) {
      return { missing: `GitBook marks this spec as broken (${reference})` };
    }
    const github = reference.match(
      /^https:\/\/(?:raw\.githubusercontent\.com\/[^/]+\/[^/]+\/(?:refs\/heads\/)?[^/]+|github\.com\/[^/]+\/[^/]+\/(?:raw|blob)\/(?:refs\/heads\/)?[^/]+)\/([^?#]+)/,
    );
    if (github) {
      const file = path.join(this.repoRoot, decodeURIComponent(github[1]));
      return fs.existsSync(file) ? { file } : { url: reference, localMiss: file };
    }
    if (/^https?:\/\//.test(reference)) {
      return { url: reference };
    }
    const file = path.resolve(path.dirname(path.join(docsRoot, pageFile)), decodeURIComponent(reference));
    return fs.existsSync(file) ? { file } : { missing: `${path.relative(this.repoRoot, file)} does not exist` };
  }

  async load(where) {
    if (where.file) {
      const stat = fs.statSync(where.file);
      const cached = this.local.get(where.file);
      if (cached && cached.mtimeMs === stat.mtimeMs) {
        return cached.spec;
      }
      const spec = parseSpec(fs.readFileSync(where.file, 'utf8'), where.file);
      this.local.set(where.file, { mtimeMs: stat.mtimeMs, spec });
      return spec;
    }
    if (this.offline) {
      throw new Error(`not fetched (--offline): ${where.url}`);
    }
    const cached = this.remote.get(where.url);
    if (cached && Date.now() - cached.at < REMOTE_TTL_MS) {
      if (cached.error) {
        throw new Error(cached.error);
      }
      return cached.spec;
    }
    try {
      const response = await fetch(where.url, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) {
        throw new Error(`${where.url} answered HTTP ${response.status}`);
      }
      const spec = parseSpec(await response.text(), where.url);
      this.remote.set(where.url, { at: Date.now(), spec });
      return spec;
    } catch (e) {
      const error = e.name === 'TimeoutError' ? `${where.url} did not answer in 20 s` : e.message;
      this.remote.set(where.url, { at: Date.now(), error });
      throw new Error(error);
    }
  }
}

function parseSpec(text, source) {
  const trimmed = text.trim();
  try {
    return trimmed.startsWith('{') ? JSON.parse(trimmed) : yaml.load(trimmed);
  } catch (e) {
    throw new Error(`${source} is not valid ${trimmed.startsWith('{') ? 'JSON' : 'YAML'}: ${e.message.split('\n')[0]}`);
  }
}

// --- schema helpers -------------------------------------------------------------------------------------------

function pointer(spec, ref) {
  if (!ref.startsWith('#/')) {
    return undefined;
  }
  let node = spec;
  for (const raw of ref.slice(2).split('/')) {
    const key = decodeURIComponent(raw).replace(/~1/g, '/').replace(/~0/g, '~');
    node = node && typeof node === 'object' ? node[key] : undefined;
  }
  return node;
}

// Follows $ref chains. `seen` holds the refs already open on the current branch, to stop at cycles.
function deref(spec, schema, seen) {
  let current = schema;
  let circular = false;
  const refs = [];
  while (current && typeof current === 'object' && typeof current.$ref === 'string') {
    if (seen.has(current.$ref) || refs.includes(current.$ref)) {
      circular = true;
      break;
    }
    refs.push(current.$ref);
    const target = pointer(spec, current.$ref);
    if (target === undefined) {
      return { schema: { description: `Unresolved reference \`${current.$ref}\`` }, refs, circular: false };
    }
    const { $ref, ...siblings } = current;
    current = { ...target, ...siblings };
  }
  return { schema: current || {}, refs, circular };
}

function mergeAllOf(spec, schema, seen) {
  if (!Array.isArray(schema.allOf)) {
    return schema;
  }
  const merged = { ...schema, properties: { ...(schema.properties || {}) }, required: [...(schema.required || [])] };
  delete merged.allOf;
  for (const part of schema.allOf) {
    const { schema: resolved } = deref(spec, part, seen);
    const flat = mergeAllOf(spec, resolved, seen);
    Object.assign(merged.properties, flat.properties || {});
    merged.required.push(...(flat.required || []));
    for (const key of ['type', 'description', 'items', 'enum', 'format', 'oneOf', 'anyOf']) {
      if (merged[key] === undefined && flat[key] !== undefined) {
        merged[key] = flat[key];
      }
    }
  }
  if (!Object.keys(merged.properties).length) {
    delete merged.properties;
  }
  return merged;
}

function baseType(schema) {
  const types = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  if (types.length) {
    return types.filter((t) => t !== 'null').join(' | ') || 'null';
  }
  if (schema.properties || schema.additionalProperties) {
    return 'object';
  }
  if (schema.items) {
    return 'array';
  }
  if (schema.oneOf) {
    return 'one of';
  }
  if (schema.anyOf) {
    return 'any of';
  }
  return '';
}

function typeLabel(spec, schema, seen) {
  const base = baseType(schema);
  let label = base;
  if (base === 'array' && schema.items) {
    const { schema: items } = deref(spec, schema.items, seen);
    const inner = baseType(mergeAllOf(spec, items, seen)) || 'any';
    label = `${inner}[]`;
  }
  const parts = [label || 'any'];
  if (schema.enum) {
    parts.push('enum');
  }
  if (schema.format) {
    parts.push(schema.format);
  }
  for (const [key, name] of [
    ['minimum', 'min'],
    ['exclusiveMinimum', 'min (exclusive)'],
    ['maximum', 'max'],
    ['exclusiveMaximum', 'max (exclusive)'],
    ['minLength', 'min length'],
    ['maxLength', 'max length'],
    ['minItems', 'min items'],
    ['maxItems', 'max items'],
  ]) {
    if (typeof schema[key] === 'number') {
      parts.push(`${name}: ${schema[key]}`);
    }
  }
  if (schema.nullable || (Array.isArray(schema.type) && schema.type.includes('null'))) {
    parts.push('nullable');
  }
  return parts.join(' · ');
}

const inlineValue = (value) => `<code>${escapeHtml(typeof value === 'string' ? value : JSON.stringify(value))}</code>`;

// --- rendering ------------------------------------------------------------------------------------------------

function renderFields(spec, schema, required, ctx, depth, seen) {
  const { schema: resolved, refs, circular } = deref(spec, schema, seen);
  if (circular) {
    return '<p class="api-note">Circular reference.</p>';
  }
  const branch = new Set([...seen, ...refs]);
  const flat = mergeAllOf(spec, resolved, branch);
  if (flat.properties) {
    const needed = new Set(flat.required || required || []);
    return Object.entries(flat.properties)
      .map(([name, child]) => renderField(spec, name, child, needed.has(name), ctx, depth, branch))
      .join('');
  }
  if (baseType(flat) === 'array' && flat.items) {
    return renderFields(spec, flat.items, [], ctx, depth, branch);
  }
  if (flat.oneOf || flat.anyOf) {
    return renderVariants(spec, flat.oneOf || flat.anyOf, ctx, depth, branch);
  }
  return '';
}

function renderVariants(spec, variants, ctx, depth, seen) {
  return variants
    .map((variant, i) => {
      const { schema: resolved, refs } = deref(spec, variant, seen);
      const flat = mergeAllOf(spec, resolved, new Set([...seen, ...refs]));
      const title = flat.title || `Option ${i + 1}`;
      const body = renderFields(spec, variant, flat.required, ctx, depth + 1, seen);
      const description = flat.description ? `<div class="api-field-desc">${ctx.markdown(flat.description)}</div>` : '';
      return (
        `<div class="api-variant"><div class="api-variant-head"><span class="api-variant-title">${escapeHtml(title)}</span>` +
        `<span class="api-field-type">${escapeHtml(typeLabel(spec, flat, seen))}</span></div>${description}${body}</div>`
      );
    })
    .join('');
}

function renderField(spec, name, schema, required, ctx, depth, seen) {
  const { schema: resolved, refs, circular } = deref(spec, schema, seen);
  const branch = new Set([...seen, ...refs]);
  const flat = mergeAllOf(spec, resolved, branch);
  const facts = [];
  if (flat.default !== undefined) {
    facts.push(`Default: ${inlineValue(flat.default)}`);
  }
  if (Array.isArray(flat.enum)) {
    const shown = flat.enum.slice(0, MAX_ENUM).map(inlineValue).join(' ');
    const more = flat.enum.length > MAX_ENUM ? ` <span class="api-more">and ${flat.enum.length - MAX_ENUM} more</span>` : '';
    facts.push(`Possible values: ${shown}${more}`);
  }
  if (flat.example !== undefined && typeof flat.example !== 'object') {
    facts.push(`Example: ${inlineValue(flat.example)}`);
  }
  if (flat.pattern) {
    facts.push(`Pattern: ${inlineValue(flat.pattern)}`);
  }

  let children = '';
  if (circular) {
    children = '<p class="api-note">Circular reference.</p>';
  } else if (depth < MAX_DEPTH) {
    const items = baseType(flat) === 'array' && flat.items ? mergeAllOf(spec, deref(spec, flat.items, branch).schema, branch) : null;
    const container = items || flat;
    if (container.properties || container.oneOf || container.anyOf) {
      children = renderFields(spec, items ? flat.items : flat, container.required, ctx, depth + 1, branch);
    }
  }
  const label = flat.oneOf ? 'one of' : flat.anyOf ? 'any of' : null;
  const type = label ? label + (baseType(flat) === 'array' ? '[]' : '') : typeLabel(spec, flat, branch);
  return (
    '<div class="api-field">' +
    `<div class="api-field-head"><code class="api-field-name">${escapeHtml(name)}</code>` +
    `<span class="api-field-type">${escapeHtml(type)}</span>` +
    (required ? '<span class="api-required">required</span>' : '<span class="api-optional">optional</span>') +
    (flat.deprecated ? '<span class="api-deprecated">deprecated</span>' : '') +
    '</div>' +
    (flat.description ? `<div class="api-field-desc">${ctx.markdown(flat.description)}</div>` : '') +
    (facts.length ? `<div class="api-field-facts">${facts.map((f) => `<div>${f}</div>`).join('')}</div>` : '') +
    (children ? `<details class="api-children"><summary>Show properties</summary><div class="api-children-body">${children}</div></details>` : '') +
    '</div>'
  );
}

// An example value built from the schema: examples and defaults first, then a placeholder per type.
export function sampleOf(spec, schema, { requiredOnly = false, depth = 0, seen = new Set() } = {}) {
  const { schema: resolved, refs, circular } = deref(spec, schema, seen);
  if (circular || depth > MAX_DEPTH) {
    return {};
  }
  const branch = new Set([...seen, ...refs]);
  const flat = mergeAllOf(spec, resolved, branch);
  if (flat.example !== undefined) {
    return flat.example;
  }
  if (Array.isArray(flat.examples) && flat.examples.length) {
    return flat.examples[0];
  }
  if (flat.default !== undefined) {
    return flat.default;
  }
  if (flat.const !== undefined) {
    return flat.const;
  }
  if (Array.isArray(flat.enum) && flat.enum.length) {
    return flat.enum[0];
  }
  if (flat.oneOf || flat.anyOf) {
    return sampleOf(spec, (flat.oneOf || flat.anyOf)[0], { requiredOnly, depth: depth + 1, seen: branch });
  }
  const type = Array.isArray(flat.type) ? flat.type.find((t) => t !== 'null') : flat.type || baseType(flat);
  switch (type) {
    case 'object': {
      const out = {};
      const required = new Set(flat.required || []);
      for (const [key, child] of Object.entries(flat.properties || {})) {
        if (!requiredOnly || required.has(key)) {
          out[key] = sampleOf(spec, child, { requiredOnly, depth: depth + 1, seen: branch });
        }
      }
      return out;
    }
    case 'array':
      return flat.items ? [sampleOf(spec, flat.items, { requiredOnly, depth: depth + 1, seen: branch })] : [];
    case 'integer':
    case 'number':
      return typeof flat.minimum === 'number' ? flat.minimum : 1;
    case 'boolean':
      return true;
    case 'null':
      return null;
    case 'string':
      return (
        {
          'date-time': '2026-01-01T00:00:00Z',
          date: '2026-01-01',
          uri: 'https://example.com',
          url: 'https://example.com',
          email: 'name@example.com',
          uuid: '123e4567-e89b-12d3-a456-426614174000',
          binary: '(binary)',
        }[flat.format] || 'text'
      );
    default:
      return null;
  }
}

function bearerPlaceholder(spec) {
  const schemes = Object.values(spec.components?.securitySchemes || {});
  const bearer = schemes.find((s) => s && s.type === 'http' && String(s.scheme).toLowerCase() === 'bearer');
  if (!bearer) {
    return null;
  }
  return /^<.*>$/.test(bearer.bearerFormat || '') ? bearer.bearerFormat : 'YOUR_SECRET_TOKEN';
}

function curlSample(spec, method, url, media, body) {
  const lines = [`curl --request ${method.toUpperCase()} \\`, `  --url '${url}'`];
  const token = bearerPlaceholder(spec);
  if (token) {
    lines[lines.length - 1] += ' \\';
    lines.push(`  --header 'Authorization: Bearer ${token}'`);
  }
  if (body !== undefined) {
    lines[lines.length - 1] += ' \\';
    lines.push(`  --header 'Content-Type: ${media}' \\`);
    lines.push(`  --data '${JSON.stringify(body, null, 2).replace(/'/g, "'\\''")}'`);
  }
  return lines.join('\n');
}

const SAMPLE_LANGUAGES = { curl: 'bash', javascript: 'javascript', js: 'javascript', python: 'python', node: 'javascript' };

function renderSamples(samples, id) {
  if (samples.length === 1) {
    return renderCode(samples[0].source, samples[0].lang);
  }
  const bar = samples
    .map(
      (s, i) =>
        `<button type="button" role="tab" class="tab" id="${id}-t${i}" aria-controls="${id}-p${i}" aria-selected="${i === 0}">${escapeHtml(s.label)}</button>`,
    )
    .join('');
  const panels = samples
    .map(
      (s, i) =>
        `<div class="tab-panel" role="tabpanel" id="${id}-p${i}" aria-labelledby="${id}-t${i}"${i ? ' hidden' : ''}>${renderCode(s.source, s.lang)}</div>`,
    )
    .join('');
  return `<div class="tabs tabs-flat"><div class="tabs-bar" role="tablist">${bar}</div>${panels}</div>`;
}

function statusClass(status) {
  const first = String(status)[0];
  return ['2', '3', '4', '5'].includes(first) ? `s${first}xx` : 'sdefault';
}

export async function renderApiBlock({ reference, method, path: opPath, node, ctx }) {
  const where = ctx.specs.locate(reference, ctx.file, ctx.docsRoot);
  const fail = (message) => {
    ctx.problem('openapi', node.lineNo, message);
    return (
      `<div class="api-block api-error"><div class="api-head"><span class="api-method">${escapeHtml((method || '?').toUpperCase())}</span>` +
      `<code class="api-url">${escapeHtml(opPath || '?')}</code></div><p>${escapeHtml(message)}</p></div>`
    );
  };
  if (where.missing) {
    return fail(`API block: ${where.missing}`);
  }
  let spec;
  try {
    spec = await ctx.specs.load(where);
  } catch (e) {
    return fail(`API block: ${e.message}${where.localMiss ? ` (no local file ${path.relative(ctx.specs.repoRoot, where.localMiss)})` : ''}`);
  }
  const verb = String(method || '').toLowerCase();
  const pathItem = spec?.paths?.[opPath];
  const operation = pathItem?.[verb];
  if (!operation) {
    const known = Object.entries(spec?.paths || {})
      .flatMap(([p, item]) => METHODS.filter((m) => item && item[m]).map((m) => `${m.toUpperCase()} ${p}`))
      .slice(0, 6)
      .join(', ');
    return fail(`API block: the spec has no ${verb.toUpperCase()} ${opPath}${known ? ` (it has ${known})` : ''}`);
  }

  const server = (operation.servers || pathItem.servers || spec.servers || [])[0]?.url?.replace(/\/$/, '') || '';
  const seen = new Set();
  const sections = [];

  const parameters = [...(pathItem.parameters || []), ...(operation.parameters || [])].map((p) => deref(spec, p, seen).schema);
  for (const [where_, title] of [
    ['path', 'Path parameters'],
    ['query', 'Query parameters'],
    ['header', 'Header parameters'],
  ]) {
    const list = parameters.filter((p) => p.in === where_);
    if (list.length) {
      const fields = list
        .map((p) => renderField(spec, p.name, { ...(p.schema || {}), description: p.description ?? p.schema?.description }, p.required, ctx, 0, seen))
        .join('');
      sections.push(`<section class="api-section"><div class="api-section-head"><h4>${title}</h4></div>${fields}</section>`);
    }
  }

  // GitBook lists authorizations only when the spec says the operation needs them.
  const secured = (operation.security || spec.security || []).length > 0;
  const token = bearerPlaceholder(spec);
  if (secured && token) {
    sections.unshift(
      '<section class="api-section"><div class="api-section-head"><h4>Authorizations</h4></div>' +
        '<div class="api-field"><div class="api-field-head"><code class="api-field-name">Authorization</code><span class="api-field-type">string</span><span class="api-required">required</span></div>' +
        `<div class="api-field-desc"><p>Bearer authentication header of the form <code>Bearer ${escapeHtml(token)}</code>.</p></div></div></section>`,
    );
  }

  let body;
  let media = 'application/json';
  const requestBody = operation.requestBody ? deref(spec, operation.requestBody, seen).schema : null;
  if (requestBody?.content) {
    media = Object.keys(requestBody.content).includes('application/json') ? 'application/json' : Object.keys(requestBody.content)[0];
    const content = requestBody.content[media] || {};
    if (content.schema) {
      sections.push(
        `<section class="api-section"><div class="api-section-head"><h4>Body</h4><span class="api-media">${escapeHtml(media)}</span></div>` +
          `${renderFields(spec, content.schema, null, ctx, 0, seen)}</section>`,
      );
      body = content.example ?? sampleOf(spec, content.schema, { requiredOnly: true });
    }
  }

  const responses = Object.entries(operation.responses || {});
  let firstResponse = null;
  if (responses.length) {
    const items = responses
      .map(([status, raw], i) => {
        const response = deref(spec, raw, seen).schema;
        const responseMedia = Object.keys(response.content || {})[0];
        const content = responseMedia ? response.content[responseMedia] : null;
        if (!firstResponse && /^2/.test(status)) {
          firstResponse = { status, response, content };
        }
        const fields = content?.schema ? renderFields(spec, content.schema, null, ctx, 0, seen) : '';
        return (
          `<details class="api-response"${i === 0 ? ' open' : ''}><summary><span class="api-status ${statusClass(status)}">${escapeHtml(status)}</span>` +
          `<span class="api-response-desc">${escapeHtml(response.description || '')}</span>` +
          (responseMedia ? `<span class="api-media">${escapeHtml(responseMedia)}</span>` : '') +
          `</summary>${fields ? `<div class="api-response-body">${fields}</div>` : ''}</details>`
        );
      })
      .join('');
    sections.push(`<section class="api-section"><div class="api-section-head"><h4>Responses</h4></div>${items}</section>`);
  }

  const samples = Array.isArray(operation['x-codeSamples']) && operation['x-codeSamples'].length
    ? operation['x-codeSamples'].map((s) => ({
        label: s.label || s.lang || 'Sample',
        lang: SAMPLE_LANGUAGES[String(s.lang || '').toLowerCase()] || String(s.lang || '').toLowerCase(),
        source: String(s.source || ''),
      }))
    : [{ label: 'cURL', lang: 'bash', source: curlSample(spec, verb, `${server}${opPath}`, media, body) }];

  let responseSample = '';
  if (firstResponse?.content) {
    const c = firstResponse.content;
    const example =
      c.example ??
      (c.examples && Object.values(c.examples)[0]?.value) ??
      (c.schema ? sampleOf(spec, c.schema) : undefined);
    if (example !== undefined) {
      responseSample =
        `<div class="api-sample"><div class="api-sample-head"><span class="api-status ${statusClass(firstResponse.status)}">${escapeHtml(firstResponse.status)}</span>` +
        `<span>${escapeHtml(firstResponse.response.description || '')}</span></div>` +
        renderCode(typeof example === 'string' ? example : JSON.stringify(example, null, 2), typeof example === 'string' ? '' : 'json') +
        '</div>';
    }
  }

  const id = ctx.uid('api');
  return (
    '<div class="api-block">' +
    `<div class="api-head"><span class="api-method api-${escapeHtml(verb)}">${escapeHtml(verb.toUpperCase())}</span>` +
    `<code class="api-url"><span class="api-server">${escapeHtml(server)}</span>${escapeHtml(opPath)}</code></div>` +
    (operation.summary ? `<div class="api-summary">${escapeHtml(operation.summary)}</div>` : '') +
    (operation.description ? `<div class="api-description">${ctx.markdown(operation.description)}</div>` : '') +
    '<div class="api-columns">' +
    `<div class="api-main">${sections.join('')}</div>` +
    '<div class="api-aside">' +
    `<div class="api-sample"><div class="api-sample-head"><span class="api-method api-${escapeHtml(verb)}">${escapeHtml(verb.toUpperCase())}</span><span>${escapeHtml(opPath)}</span></div>${renderSamples(samples, id)}</div>` +
    responseSample +
    '</div></div></div>'
  );
}
