import { FC, useCallback } from 'react';
import clsx from 'clsx';
import { OverwriteProps } from '../../../types/utils';

import './index.css';

export type Props = React.PropsWithChildren<
  OverwriteProps<
    React.HTMLAttributes<HTMLButtonElement>,
    {
      payload: string;
      active?: boolean;
      onSelect: (payload: string) => unknown;
    }
  >
>;
const Tab: FC<Props> = (props) => {
  const { active, children, onSelect, ...rest } = props;

  const handleSelect = useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      const id = ev.currentTarget.dataset.id!;
      onSelect(id);
    },
    [onSelect],
  );

  return (
    <button
      {...rest}
      data-id={rest.payload}
      className={clsx('snippet-viewer-tab', active && 'snippet-viewer-tab_active')}
      onClick={handleSelect}
    >
      {children}
    </button>
  );
};

export default Tab;
