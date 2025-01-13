import { FC, useMemo } from 'react';
import { OverwriteProps } from '../../../types/utils';
import { SnippetOption } from '../../../types/snippet';

import Skeleton from 'react-loading-skeleton';
import Scrollbars, { ScrollbarProps } from 'react-custom-scrollbars-2';

import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

export type Props = React.PropsWithChildren<
  OverwriteProps<
    React.HTMLProps<Scrollbars>,
    {
      loading?: boolean;
      option: SnippetOption & { html: string };
    }
  >
>;
const Content: FC<Props> = (props) => {
  const { option, loading, ...rest } = props;

  const lines = useMemo(() => {
    if (loading) {
      return option.content.split('\n').map((l) => l.length);
    }

    return [];
  }, [loading, option.content]);

  const scrollbar = useMemo<ScrollbarProps>(() => ({ autoHeight: true, autoHeightMax: 432 }), []);

  return (
    <>
      {loading ? (
        <Scrollbars {...scrollbar} {...rest} className="snippet-viewer-content">
          <pre className="snippet-viewer-content__inner">
            {lines.map((length, i) => (
              <Skeleton key={i} baseColor="#30363b" highlightColor="#373f45" width={`${length * 7.83}px`} />
            ))}
          </pre>
        </Scrollbars>
      ) : (
        <Scrollbars {...scrollbar} {...rest} className="snippet-viewer-content">
          <pre className="snippet-viewer-content__inner" dangerouslySetInnerHTML={{ __html: option.html }} />
        </Scrollbars>
      )}
    </>
  );
};

export default Content;
