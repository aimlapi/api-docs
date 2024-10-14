import hbs from 'handlebars';
import { CompiledSnippet, PageSnippet, SnippetOption, TemplateSnippet } from '../types/snippet';

export const compileSnippets = (templates: Record<string, TemplateSnippet>, snippets: Record<string, PageSnippet>) => {
  const compiledById: Record<string, CompiledSnippet> = {};
  for (const key in snippets) {
    const snippet = snippets[key];
    const template = templates[key];

    if (!template) {
      console.warn(`Snippet '${key}' not found`);
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
