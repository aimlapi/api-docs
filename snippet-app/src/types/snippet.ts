export type SnippetOption = { content: string; language: string };

export type PageSnippet = {
  id: string;
  key: string;
  payload: Record<string, string>;
  element: HTMLElement;
};

export type TemplateSnippet = {
  title: string;
  payload: Record<string, unknown>;
  key: string;
  options: SnippetOption[];
};

export type CompiledSnippet = {
  template: TemplateSnippet;
  snippet: PageSnippet;
  options: SnippetOption[];
};
