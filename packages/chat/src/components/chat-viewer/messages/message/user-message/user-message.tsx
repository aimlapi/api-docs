import { memo, useState } from "react";
import { Pencil } from "../../../../common/icons";
import { EditingField } from "./editing-field";

type UserMessageProps = {
  children: string;
  messageId: string;
};

export const UserMessage = memo((props: UserMessageProps) => {
  const { children, messageId } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [isShowEditingField, setIsShowEditingField] = useState(false);

  const handleChangeHover = (isHovered: boolean) => () => {
    setIsHovered(isHovered);
  };

  const handleChangeVisibilityEditingMessage = (visibility: boolean) => () => {
    setIsShowEditingField(visibility);
    setIsHovered(false);
  };

  if (isShowEditingField) {
    return (
      <EditingField
        messageId={messageId}
        initialValue={children}
        onCloseEditingField={handleChangeVisibilityEditingMessage(false)}
      />
    );
  }

  return (
    <div
      className={`relative ml-auto max-w-md py-3 px-5 bg-blue-100 rounded-3xl shadow-xs`}
      onMouseEnter={handleChangeHover(true)}
      onMouseLeave={handleChangeHover(false)}
    >
      <p className="leading-none">{children}</p>
      {isHovered && (
        <div className="absolute p-[5px] right-0 top-[35px">
          <button
            onClick={handleChangeVisibilityEditingMessage(true)}
            className="border-none bg-gray-100 shadow-xs rounded-md p-1 cursor-pointer hover:bg-gray-200"
          >
            <Pencil />
          </button>
        </div>
      )}
    </div>
  );
});
