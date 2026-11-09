import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSummary, slugify, linkTarget, pagePath } from '../src/summary.js';

test('slugify lower-cases and drops what GitBook drops', () => {
  assert.equal(slugify('ML-API'), 'ml-api');
  assert.equal(slugify('minimax-music-[legacy]'), 'minimax-music-legacy');
  assert.equal(slugify('kimi-k3.1-pro'), 'kimi-k3.1-pro');
  assert.equal(slugify('untitled (1)'), 'untitled-1');
});

test('linkTarget unescapes Markdown and drops titles', () => {
  assert.equal(linkTarget('a/minimax-music-\\[legacy].md'), 'a/minimax-music-[legacy].md');
  assert.equal(linkTarget('page.md "mention"'), 'page.md');
  assert.equal(linkTarget('<with space.md>'), 'with space.md');
  assert.equal(linkTarget('with%20space.md'), 'with space.md');
});

test('pagePath folds README into its folder', () => {
  assert.equal(pagePath('README.md'), '');
  assert.equal(pagePath('quickstart/simple-model/README.md'), 'quickstart/simple-model');
  assert.equal(pagePath('faq.md'), 'faq');
});

test('URLs follow GitBook: top-level pages keep their path, nested pages hang off their parent', () => {
  const { groups, nodes } = parseSummary(
    [
      '# Table of contents',
      '',
      '## Quickstart',
      '',
      '* [Documentation Map](README.md)',
      '* [Quickstart](quickstart/simple-model/README.md)',
      '* [CLI](quickstart/cli.md)',
      '  * [Agent setup skill](skills/aimlapi-setup.md)',
      '',
      '## API REFERENCES',
      '',
      '* [Text Models (LLM)](api-references/text-models-llm/README.md)',
      '  * [AI/ML API](api-references/text-models-llm/AI/ML-API/README.md)',
      '    * [Dynamic Router](api-references/text-models-llm/AI/ML-API/dynamic-router.md)',
      '  * [Zhipu](api-references/text-models-llm/zhipu-ai/README.md)',
      '  * [Zhipu again](api-references/text-models-llm/Zhipu-AI/README.md)',
      '* [📞Contact Sales](mailto:sales@example.com)',
    ].join('\n'),
  );
  const url = (title) => nodes.find((n) => n.title === title).url;
  assert.deepEqual(groups.map((g) => g.title), ['Quickstart', 'API REFERENCES']);
  assert.equal(url('Documentation Map'), '/');
  assert.equal(url('Quickstart'), '/quickstart/simple-model');
  assert.equal(url('Agent setup skill'), '/quickstart/cli/aimlapi-setup');
  assert.equal(url('AI/ML API'), '/api-references/text-models-llm/ml-api');
  assert.equal(url('Dynamic Router'), '/api-references/text-models-llm/ml-api/dynamic-router');
  assert.equal(url('Zhipu'), '/api-references/text-models-llm/zhipu-ai');
  assert.equal(url('Zhipu again'), '/api-references/text-models-llm/zhipu-ai-1');
  const sales = nodes.find((n) => n.title === '📞Contact Sales');
  assert.equal(sales.external, 'mailto:sales@example.com');
  assert.equal(sales.url, undefined);
});
