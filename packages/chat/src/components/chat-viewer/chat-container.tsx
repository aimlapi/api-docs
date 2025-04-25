import { FC } from "react";

export const ChatContainer: FC<React.PropsWithChildren> = (props) => {
  return (
    <div className="shadow-sm rounded-md m-auto flex flex-col gap-2 border border-gray-100 whitespace-pre-wrap">
      {props.children}
    </div>
  );
};
