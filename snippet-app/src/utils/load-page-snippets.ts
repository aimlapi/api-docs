import { PageSnippet } from '../types/snippet';

export const loadPageSnippets = () => {
  const elements = document.querySelectorAll('snippet[data-name]');
  const byKey: Record<string, PageSnippet> = {};
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      const { name, ...payload } = element.dataset;
      if (!name) {
        console.warn('No snippet provided:', element);
        return;
      }

      byKey[name] = {
        id: Math.random().toFixed(10).slice(2),
        key: name || '',
        payload: (payload as Record<string, string>) || {},
        element,
      };
    }
  });

  return byKey;
};
