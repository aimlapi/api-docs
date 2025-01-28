const fs = require('fs');
const path = require('path');

const readTemplate = (name) => {
  const content = fs.readFileSync(path.join(__dirname, `./${name}.hbs`), 'utf8');

  return `[#generator:start]: <> ({ "template": "${name}" })
${content}
[#generator:end]: <> ({})`;
};

const replaceTemplate = (name) => (prev, next) => {
  if (!prev.trim()) {
    return next;
  }

  const expr = /^\[#generator:start\]:\s<>\s\(({.+?})\)(.+?)\[#generator:end\].+?$/gms;

  return prev.replace(expr, (match, payload, content) => {
    const config = JSON.parse(payload);
    return config.template === name ? match.replace(match, next) : content;
  });
};

const TEMPLATE = {
  openapi: 'openapi',
  summary: 'summary',
  models: 'models',
};

module.exports = { readTemplate, replaceTemplate, TEMPLATE };
