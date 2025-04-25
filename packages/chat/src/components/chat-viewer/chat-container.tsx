import { FC } from "react";

export const ChatContainer: FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="shadow-sm rounded-md m-0 flex flex-col gap-2 border border-gray-100 whitespace-pre-wrap flex-1">
      {props.children}
    </div>
  );
};
