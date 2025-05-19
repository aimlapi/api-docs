import { TextareaHTMLAttributes, FC, KeyboardEvent, useState, ChangeEvent } from "react";
import { useAdjustFieldHeight, useChat } from "../../hooks";
import { SendButton } from "./send-button";
import { ArrowDown } from "../common";

type ChatInputProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onKeyDown" | "value">;

export const ChatInput: FC<ChatInputProps> = (props) => {
  const { rows = 0, className = "", autoFocus = true, ...restProps } = props;

  const { isBottomScroll, handleScrollToLastMessage, setInput, input, handleSendMessage } =
    useChat();

  const [isFocused, setIsFocused] = useState(true);

  const { fieldRef } = useAdjustFieldHeight<HTMLTextAreaElement>({ value: input });

  const isActiveColor = isFocused && input.trim();

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === "Enter" && !event.shiftKey && input.trim()) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleChangeFocus = (isFocused: boolean) => () => {
    setIsFocused(isFocused);
  };

  const handleClickArrowDown = () => {
    handleScrollToLastMessage();
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <section
      className={`relative flex flex-col items-end justify-center border ${
        isActiveColor ? "border-blue-400" : "border-gray-400"
      } p-3 w-full rounded-2xl outline-transparent outline-2 transition-colors resize-none shadow-md`}
    >
      {!isBottomScroll && (
        <div
          onClick={handleClickArrowDown}
          className="absolute top-[-15px] right-[50%] w-8 h-8 z-10 rounded-full bg-blue-400 flex justify-center items-center shadow-md cursor-pointer"
        >
          <ArrowDown />
        </div>
      )}

      <textarea
        onKeyDown={onKeyDown}
        ref={fieldRef}
        autoFocus={autoFocus}
        className={`w-full outline-transparent outline-2 transition-colors resize-none ${className}`}
        onChange={handleChange}
        onBlur={handleChangeFocus(false)}
        onFocus={handleChangeFocus(true)}
        value={input}
        rows={rows}
        {...restProps}
      />
      <div>
        <SendButton onClick={handleSendMessage} disabled={!input.trim()} />
      </div>
    </section>
  );
};
