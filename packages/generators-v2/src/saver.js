import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function saveSchema(schema, options) {
  const rootPath = path.join(__dirname, '../../../docs/api-references');
  const categoryPath = path.join(
    rootPath,
    options.category,
    options.vendor.replace(/ /g, '-')
  );
  await fs.mkdir(categoryPath, { recursive: true });

  const filePath = path.join(
    categoryPath,
    `${options.alias
      .replace(/#/g, '')
      .replace(/ /g, '-')
      .replace(/\//g, '-')}.json`
  );
  await fs.writeFile(filePath, JSON.stringify(schema, null, 2), 'utf-8');
}
