import yaml from 'js-yaml';

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

// Splits a page into its YAML frontmatter and its Markdown body. `lines` is how many lines the frontmatter took,
// so problems can point at the right line of the file.
export function readFrontmatter(source) {
  const text = source.replace(/^﻿/, '');
  const match = text.match(FRONTMATTER);
  if (!match) {
    return { data: {}, body: text, lines: 0, error: null };
  }
  let data = {};
  let error = null;
  try {
    const parsed = yaml.load(match[1]);
    data = parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) {
    error = e.message.split('\n')[0];
  }
  return { data, body: text.slice(match[0].length), lines: match[0].split('\n').length - 1, error };
}

// GitBook's page layout switches, e.g. `layout: { outline: { visible: false } }`. Anything not set stays visible.
export function layoutOf(data) {
  const layout = data && typeof data.layout === 'object' && data.layout ? data.layout : {};
  const visible = (key) => !(layout[key] && layout[key].visible === false);
  return {
    wide: layout.width === 'wide',
    title: visible('title'),
    description: visible('description'),
    tableOfContents: visible('tableOfContents'),
    outline: visible('outline'),
    pagination: visible('pagination'),
  };
}
