import { FC } from 'react';
import { OverwriteProps } from '../../../types/utils';
import { BookOpen, Copy } from 'react-feather';

import './index.css';
import { CompiledSnippet } from '../../../types/snippet';

export type Props = React.PropsWithChildren<
  OverwriteProps<
    React.HTMLAttributes<HTMLElement>,
    {
      isCopied?: boolean;
      onCopy: () => unknown;

      snippet: CompiledSnippet;
    }
  >
>;
const Footer: FC<Props> = (props) => {
  const { snippet, isCopied, onCopy, ...rest } = props;

  return (
    <footer className="snippet-viewer-footer" {...rest}>
      <button className="snippet-viewer-footer__btn" onClick={onCopy}>
        {isCopied ? 'Copied!' : 'Copy'} <Copy size={14} />
      </button>
      {(typeof snippet.snippet.payload?.docs === 'string' ||
        snippet.template.config.docs) && (
        <a
          type="button"
          href={
            (snippet.snippet.payload?.docs as string) ||
            snippet.template.config.docs
          }
          className="snippet-viewer-footer__btn"
          onClick={onCopy}
        >
          Docs <BookOpen size={14} />
        </a>
      )}
    </footer>
  );
};

export default Footer;
