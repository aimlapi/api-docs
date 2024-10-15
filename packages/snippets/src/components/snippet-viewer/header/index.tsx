import { FC } from 'react';
import { OverwriteProps } from '../../../types/utils';

import './index.css';
import { CompiledSnippet, SnippetOption } from '../../../types/snippet';
import { LANGUAGE_MAP } from '../../../constants/language';
import Tab from '../tab';

export type Props = React.PropsWithChildren<
  OverwriteProps<
    React.HTMLAttributes<HTMLElement>,
    {
      language: string;
      snippet: CompiledSnippet;
      options: SnippetOption[];

      onSetLanguage: (language: string) => unknown;
    }
  >
>;
const Header: FC<Props> = (props) => {
  const { language, snippet, options, onSetLanguage, ...rest } = props;

  return (
    <header className="snippet-viewer-header" {...rest}>
      <span className="snippet-viewer-header__title">{snippet.template.config.title}</span>
      {options.map((o) => (
        <Tab key={o.language} onSelect={onSetLanguage} payload={o.language} active={o.language === language}>
          {(LANGUAGE_MAP as Record<string, string>)[o.language] || o.language}
        </Tab>
      ))}
    </header>
  );
};

export default Header;
