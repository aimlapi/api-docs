import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function saveSchema(schema, options) {
  const rootPath = path.join(__dirname, '../../../docs/api-references');
  console.log(__dirname);
  const categoryPath = path.join(
    rootPath,
    options.category,
    options.vendor
  );
  await fs.mkdir(categoryPath, { recursive: true });

  const filePath = path.join(categoryPath, `${options.alias}.json`);
  await fs.writeFile(filePath, JSON.stringify(schema, null, 2), 'utf-8');
}
