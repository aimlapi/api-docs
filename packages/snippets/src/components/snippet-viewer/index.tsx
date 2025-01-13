import { codeToHtml } from 'shiki/bundle/web';
import { CompiledSnippet, SnippetOption } from '../../types/snippet';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import Content from './content';
import Header from './header';
import Footer from './footer';

import './index.css';

export type Props = {
  snippet: CompiledSnippet;
};
const SnippetViewer: FC<Props> = (props: Props) => {
  const { snippet } = props;
  const [options, setOptions] = useState<(SnippetOption & { html: string; loaded?: boolean })[]>(() =>
    snippet.options.map((s) => ({ ...s, html: '' })),
  );
  const [language, setLanguage] = useState(snippet.options[0].language);

  const selectedOption = useMemo(() => {
    return options.find((o) => o.language === language) || options[0];
  }, [language, options]);

  useEffect(() => {
    let isCancelled = false;
    snippet.options.forEach((o, i) => {
      codeToHtml(o.content, {
        lang: o.language,
        theme: 'github-dark',
        transformers: [],
      }).then((html) => {
        if (isCancelled) {
          return;
        }

        setOptions((prev) => {
          const updated = [...prev];
          updated[i] = { ...updated[i], html, loaded: true };

          return updated;
        });
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [snippet.options]);

  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = useCallback(() => {
    let isCancelled = false;

    if (isCopied) {
      return;
    }

    setIsCopied(true);

    window.navigator.clipboard.writeText(selectedOption.content);

    setTimeout(() => {
      if (isCancelled) {
        return;
      }

      setIsCopied(false);
    }, 10000);

    return () => {
      isCancelled = true;
    };
  }, [isCopied, selectedOption.content]);

  return (
    <div className="snippet-viewer">
      <Header snippet={snippet} language={language} options={options} onSetLanguage={setLanguage} />
      <Content option={selectedOption} loading={!selectedOption.loaded} />
      <Footer snippet={snippet} isCopied={isCopied} onCopy={handleCopy} />
    </div>
  );
};

export default SnippetViewer;
