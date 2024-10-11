import { PageSnippet } from '../types/snippet';

export const loadPageSnippets = () => {
  const elements = document.querySelectorAll('code[data-snippet]');
  const byKey: Record<string, PageSnippet> = {};
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      const { snippet, ...payload } = element.dataset;
      if (!snippet) {
        console.warn('No snippet provided:', element);
        return;
      }

      byKey[snippet] = {
        id: Math.random().toFixed(10).slice(2),
        key: snippet || '',
        payload: (payload as Record<string, string>) || {},
        element,
      };
    }
  });

  return byKey;
};
