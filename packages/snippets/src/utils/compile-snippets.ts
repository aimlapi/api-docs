import hbs from 'handlebars';
import { CompiledSnippet, PageSnippet, SnippetOption, TemplateSnippet } from '../types/snippet';

export const compileSnippets = (templates: Record<string, TemplateSnippet>, snippets: Record<string, PageSnippet>) => {
  const compiledById: Record<string, CompiledSnippet> = {};
  for (const id in snippets) {
    const snippet = snippets[id];
    const template = templates[snippet.key];

    if (!template) {
      console.warn(`Snippet '${snippet.key}' not found`);
      continue;
    }

    const options: SnippetOption[] = template.options.map((o) => ({
      ...o,
      content: hbs.compile(o.content, { noEscape: true })({ ...template.payload, ...snippet.payload }),
    }));

    compiledById[snippet.id] = { snippet, options, template };
  }

  return compiledById;
};
