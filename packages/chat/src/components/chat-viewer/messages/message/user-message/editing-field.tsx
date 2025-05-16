import { ChangeEvent, useState } from "react";
import { useAdjustFieldHeight, useChat } from "../../../../../hooks";
import { Button } from "../../../../common";

type EditingFieldProps = {
  initialValue: string;
  onCloseEditingField: () => void;
  messageId: string;
};

export const EditingField = (props: EditingFieldProps) => {
  const { initialValue, onCloseEditingField, messageId } = props;

  const [value, setValue] = useState(initialValue);

  const { handleEditedMessage } = useChat();
  const { fieldRef } = useAdjustFieldHeight<HTMLTextAreaElement>({ value });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSendEditedMessage = () => {
    onCloseEditingField();
    handleEditedMessage(messageId, value);
  };

  return (
    <section className="ml-[25%] flex flex-col items-end gap-2">
      <textarea
        ref={fieldRef}
        value={value}
        className="w-full p-3 w-full outline-transparent outline-2 resize-none border border-blue-400 rounded-2xl shadow-md"
        onChange={handleChange}
      />
      <div className="flex gap-1 mr-2">
        <Button onClick={onCloseEditingField} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleSendEditedMessage}>Send</Button>
      </div>
    </section>
  );
};
