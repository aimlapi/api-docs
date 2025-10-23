import { loadSchema } from './loader.js';
import { transformSchema } from './transformer.js';
import { saveSchema } from './saver.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const configPath = path.join(__dirname, './json_for-docs_generation.json');
    const configData = JSON.parse(await fs.readFile(configPath, 'utf-8'));

    for (const item of configData) {
      console.log(`Processing schema: ${item.url}`);

      const schema = await loadSchema(item.url);
      const transformed = transformSchema(schema, item);
      await saveSchema(transformed, item);

      console.log(`Saved schema: ${item.alias}`);
    }
  } catch (e) {
    console.error(e);
  }
}

main();
