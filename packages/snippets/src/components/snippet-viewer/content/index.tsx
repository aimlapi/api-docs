import { FC, useMemo } from 'react';
import { OverwriteProps } from '../../../types/utils';
import { SnippetOption } from '../../../types/snippet';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

export type Props = React.PropsWithChildren<
  OverwriteProps<
    React.HTMLAttributes<HTMLDivElement>,
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

  if (!loading) {
    return <div {...rest} className="snippet-viewer-content" dangerouslySetInnerHTML={{ __html: option.html }} />;
  } else {
    return (
      <div {...rest} className="snippet-viewer-content">
        <pre>
          {lines.map((length, i) => (
            <Skeleton key={i} baseColor="#30363b" highlightColor="#373f45" width={`${length * 7.83}px`} />
          ))}
        </pre>
      </div>
    );
  }
};

export default Content;
