const fs = require('fs');
const path = require('path');

const readTemplate = (name) => {
  return fs.readFileSync(path.join(__dirname, `./${name}.hbs`), 'utf8');
};

const TEMPLATE = {
  swagger: 'swagger',
};

module.exports = { readTemplate, TEMPLATE };
