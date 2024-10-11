import { snippets } from '../constants/snippets';
import { TemplateSnippet } from '../types/snippet';

const exportKeyMetadata = (group: string, name: string) => {
  return [group, name].join('.').replace(/_/gm, '-');
};

export const loadTemplateSnippets = () => {
  const byKey: Record<string, TemplateSnippet> = {};
  Object.keys(snippets).forEach((key) => {
    const snippet = snippets[key];

    const k = exportKeyMetadata(snippet.group, snippet.name);
    const option = { language: snippet.language, content: snippet.content };
    const template: TemplateSnippet = {
      key,
      title: snippet.config.title || snippet.name,
      options: [...(byKey[k]?.options || []), option],
      payload: snippet.config.payload || {},
    };

    byKey[k] = { ...byKey[k], ...template };
  });

  return byKey;
};
