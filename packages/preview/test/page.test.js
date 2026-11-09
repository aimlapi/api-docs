import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createSite } from '../src/site.js';
import { renderPage } from '../src/page.js';
import { renderDocument } from '../src/layout.js';

// A tiny GitBook repo in a temp folder: two pages, an API spec, and every kind of block the docs use.
function fixture() {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-preview-'));
  const write = (file, text) => {
    fs.mkdirSync(path.dirname(path.join(repo, file)), { recursive: true });
    fs.writeFileSync(path.join(repo, file), text);
  };
  write('.gitbook.yaml', 'root: ./docs/\n');
  write('docs/SUMMARY.md', '# Table of contents\n\n## Guides\n\n* [Home](README.md)\n* [Models](models/README.md)\n  * [Chat](models/Chat-Models/chat.md)\n');
  write('docs/README.md', '# Home\n\nSee [the chat model](models/Chat-Models/chat.md#api-schema) and [a ghost](missing.md).\n');
  write('docs/models/README.md', '# Models\n');
  write(
    'docs/models/Chat-Models/chat.md',
    [
      '---',
      'description: Talk to a model.',
      '---',
      '',
      '# Chat',
      '',
      '{% hint style="warning" %}',
      'Mind the **limits**.',
      '{% endhint %}',
      '',
      '## API Schema <a href="#api-schema" id="api-schema"></a>',
      '',
      '{% openapi-operation spec="chat" path="/v1/chat" method="post" %}',
      '[OpenAPI chat](https://raw.githubusercontent.com/acme/docs/refs/heads/main/docs/models/Chat-Models/chat.json)',
      '{% endopenapi-operation %}',
      '',
      '{% tabs %}',
      '{% tab title="Python" %}',
      '{% code title="main.py" overflow="wrap" %}',
      '```python',
      'print("hi")',
      '```',
      '{% endcode %}',
      '{% endtab %}',
      '{% tab title="JS" %}',
      '1. one',
      '2. two',
      '{% endtab %}',
      '{% endtabs %}',
      '',
      '{% columns %}',
      '{% column width="66%" %}',
      'Left',
      '{% endcolumn %}',
      '{% column %}',
      '<a href="https://example.com" class="button primary">Go</a>',
      '{% endcolumn %}',
      '{% endcolumns %}',
      '',
      '{% mystery %}',
      'Inside',
      '{% endmystery %}',
      '',
      '<figure><img src="../../.gitbook/assets/pic.png" alt=""><figcaption><p>Pic</p></figcaption></figure>',
      '',
    ].join('\n'),
  );
  write(
    'docs/models/Chat-Models/chat.json',
    JSON.stringify({
      openapi: '3.0.0',
      servers: [{ url: 'https://api.example.com' }],
      components: { schemas: { Msg: { type: 'object', required: ['role'], properties: { role: { type: 'string', enum: ['user'] }, next: { $ref: '#/components/schemas/Msg' } } } } },
      paths: {
        '/v1/chat': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['model', 'messages'],
                    properties: {
                      model: { type: 'string', enum: ['acme/chat'], description: 'The **model**.' },
                      messages: { type: 'array', items: { $ref: '#/components/schemas/Msg' } },
                      temperature: { type: 'number', minimum: 0, maximum: 2 },
                    },
                  },
                },
              },
            },
            responses: { 200: { description: 'OK', content: { 'application/json': { schema: { type: 'object', properties: { id: { type: 'string', example: 'chat-1' } } } } } } },
          },
        },
      },
    }),
  );
  return repo;
}

function snapshot(dir) {
  const out = {};
  const walk = (d) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else {
        out[path.relative(dir, p)] = fs.readFileSync(p, 'utf8');
      }
    }
  };
  walk(dir);
  return out;
}

test('a page with every block kind renders, and the checkout is left untouched', async () => {
  const repo = fixture();
  const before = snapshot(repo);
  const site = createSite({ repoRoot: repo, offline: true });
  const page = await renderPage(site, 'models/Chat-Models/chat.md');
  const html = page.html;

  assert.equal(page.title, 'Chat');
  assert.equal(page.description, 'Talk to a model.');
  assert.equal(page.hasApiBlocks, true);
  assert.match(html, /<div class="hint hint-warning"[\s\S]*Mind the <strong>limits<\/strong>/);
  assert.match(html, /<h2 id="api-schema">API Schema<\/h2>/);
  assert.match(html, /class="api-method api-post">POST<\/span>/);
  assert.match(html, /<span class="api-server">https:\/\/api\.example\.com<\/span>\/v1\/chat/);
  assert.match(html, /The <strong>model<\/strong>\./);
  assert.match(html, /number · min: 0 · max: 2/);
  assert.match(html, /Circular reference\./);
  assert.match(html, /&quot;chat-1&quot;|"chat-1"|chat-1/);
  assert.match(html, /<button type="button" role="tab" class="tab"[^>]*aria-selected="true">Python<\/button>/);
  assert.match(html, /<div class="code-title">main\.py<\/div>/);
  assert.match(html, /<ol>\s*<li>one<\/li>/);
  assert.match(html, /<div class="column" style="--column-width:66">/);
  assert.match(html, /class="button primary">Go<\/a>/);
  assert.match(html, /src="\/~files\/\.gitbook\/assets\/pic\.png"/);
  assert.doesNotMatch(html, /<!--gbp-/);
  assert.deepEqual(page.outline, [{ level: 2, id: 'api-schema', text: 'API Schema' }]);
  assert.deepEqual(
    page.problems.map((p) => p.type).sort(),
    ['missing-file', 'unknown-block'],
  );

  const document = renderDocument({ site, node: site.index.byFile.get('models/Chat-Models/chat.md'), page });
  assert.match(document, /<a class="nav-link active" aria-current="page" href="\/models\/chat">/);
  assert.match(document, /Local preview/);
  // GitBook shows the SUMMARY.md label, not the file's own H1.
  const renamed = renderDocument({ site, node: { ...site.index.byFile.get('models/Chat-Models/chat.md'), title: 'Chat (label)' }, page });
  assert.match(renamed, /<title>Chat \(label\) \|/);
  assert.match(renamed, /<h1 class="page-title"><span>Chat \(label\)<\/span><\/h1>/);

  assert.deepEqual(snapshot(repo), before);
  fs.rmSync(repo, { recursive: true, force: true });
});

test('links resolve to GitBook URLs, and broken ones are flagged', async () => {
  const repo = fixture();
  const site = createSite({ repoRoot: repo, offline: true });
  const page = await renderPage(site, 'README.md');
  assert.match(page.html, /href="\/models\/chat#api-schema"/);
  assert.match(page.html, /class="broken-link"[^>]*>a ghost<\/a>|href="missing\.md" class="broken-link"/);
  assert.deepEqual(page.problems.map((p) => p.type), ['broken-link']);
  fs.rmSync(repo, { recursive: true, force: true });
});
