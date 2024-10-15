import { useMemo } from 'react';
import { loadPageSnippets } from '../../utils/load-page-snippets';
import SnippetViewer from '../snippet-viewer';
import { loadTemplateSnippets } from '../../utils/load-template-snippets';
import { compileSnippets } from '../../utils/compile-snippets';
import { createPortal } from 'react-dom';

const App = () => {
  const { compiledById, snippets } = useMemo(() => {
    const templates = loadTemplateSnippets();
    const snippets = loadPageSnippets();
    return { compiledById: compileSnippets(templates, snippets), snippets: Object.values(snippets) };
  }, []);

  return <>{snippets.map((s) => createPortal(<SnippetViewer key={s.id} snippet={compiledById[s.id]} />, s.element))}</>;
};

export default App;
