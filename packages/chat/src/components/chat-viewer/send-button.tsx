import { memo } from "react";

import { IconUp } from "../common";

type SendButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const SendButton = memo((props: SendButtonProps) => {
  const { onClick, disabled = false } = props;

  const classNameDisabled = disabled ? "bg-gray-500" : "bg-blue-400";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-full w-8.5 h-8.5 flex items-center justify-center ${classNameDisabled}`}
    >
      <IconUp />
    </button>
  );
});
