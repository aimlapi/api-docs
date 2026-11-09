import test from 'node:test';
import assert from 'node:assert/strict';
import { parseBlocks, parseAttributes } from '../src/blocks.js';
import { splitLines, createMarkdown } from '../src/markdown.js';

const blocks = (node) => node.children.filter((c) => c.type === 'block');

test('attributes, including positional ones', () => {
  assert.deepEqual(parseAttributes(' style="info" title=\'Hi\' n=3'), { style: 'info', title: 'Hi', n: '3' });
  assert.deepEqual(parseAttributes(' "../x.md"'), { _: '../x.md' });
});

test('nested blocks become a tree', () => {
  const { root, problems } = parseBlocks(
    ['{% tabs %}', '{% tab title="Python" %}', '{% code overflow="wrap" %}', '```python', 'print(1)', '```', '{% endcode %}', '{% endtab %}', '{% endtabs %}'].join('\n'),
  );
  assert.deepEqual(problems, []);
  const [tabs] = blocks(root);
  const [tab] = blocks(tabs);
  const [code] = blocks(tab);
  assert.equal(tabs.name, 'tabs');
  assert.equal(tab.attrs.title, 'Python');
  assert.equal(code.attrs.overflow, 'wrap');
});

test('a block written inside a code fence stays text', () => {
  const { root } = parseBlocks(['```markdown', '{% hint style="info" %}', 'not a hint', '{% endhint %}', '```'].join('\n'));
  assert.equal(blocks(root).length, 0);
});

test('embed works with and without an end tag', () => {
  const { root, problems } = parseBlocks(
    ['{% embed url="https://a" %}', '', '{% embed url="https://b" %}', 'Caption', '{% endembed %}'].join('\n'),
  );
  assert.deepEqual(problems, []);
  const [first, second] = blocks(root);
  assert.equal(first.leaf, true);
  assert.equal(second.leaf, undefined);
  assert.equal(second.children[0].lines.join(''), 'Caption');
});

test('unclosed and stray tags are reported with their lines', () => {
  const { problems } = parseBlocks(['{% hint style="info" %}', 'text', '{% endtab %}'].join('\n'), 10);
  assert.deepEqual(
    problems.map((p) => [p.type, p.line]),
    [
      ['stray-end', 12],
      ['unclosed-block', 10],
    ],
  );
});

test('task lists become checkboxes, like GitBook draws them', () => {
  const html = createMarkdown().render('* [ ] open\n* [x] done\n* plain');
  assert.match(html, /<ul class="task-list">/);
  assert.match(html, /<li class="task-item"><span class="task-box" role="checkbox" aria-checked="false" aria-disabled="true"><\/span>open<\/li>/);
  assert.match(html, /<span class="task-box checked"[^>]*><\/span>done/);
  assert.match(html, /<li>plain<\/li>/);
});

test('highlighted code splits into lines without breaking spans', () => {
  assert.deepEqual(splitLines('<span class="s">"a\nb"</span>\nc'), ['<span class="s">"a</span>', '<span class="s">b"</span>', 'c']);
});
