const fs = require('fs');
const path = require('path');

const readTemplate = (name) => {
  const content = fs.readFileSync(path.join(__dirname, `./${name}.hbs`), 'utf8');

  return `[#generator:start]: <> ({ "template": "${name}" })
${content}
[#generator:end]: <> ({})`;
};

const replaceTemplate =
  (name, replacer = (match, next) => match.replace(match, next)) =>
  (prev, next) => {
    if (!prev.trim()) {
      return next;
    }

    const expr = /^\[#generator:start\]:\s<>\s\(({.+?})\)(.+)\[#generator:end\].+?$/gms;

    return prev.replace(expr, (match, payload, content) => {
      const config = JSON.parse(payload);
      const replaced =
        config.template === name ? match.replace(content, '\n' + replacer(content, next) + '\n') : content;
      return replaced;
    });
  };

const summaryReplacer = (match, next) => {
  const { path, provider } = next;

  const summary = SummaryParserMap.parse(match);

  summary[provider] = {
    ...summary[provider],
    key: provider,
    value: path,
    children: { ...summary[provider]?.children },
  };

  const stringified = SummaryParserMap.stringify(summary);

  return `## Generated\n${stringified}`;
};

const escapeRegExp = (str) => {
  return str.replace(/\$/g, '$$$$');
};

const TEMPLATE = {
  openapi: 'openapi',
  summary: 'summary',
  models: 'models',
};

module.exports = { readTemplate, replaceTemplate, TEMPLATE };
