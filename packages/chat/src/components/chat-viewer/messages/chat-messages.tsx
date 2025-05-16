import { Fragment } from "react";

import { AnswerMessage, UserMessage } from "./message";
import { useChat } from "../../../hooks";

export const ChatMessages = () => {
  const { messages, chatRef } = useChat();

  return (
    <div className="flex flex-col flex-1 gap-2 p-2 overflow-auto" ref={chatRef}>
      {messages.map(({ id, prompt, isLoading, answer, source }) => (
        <Fragment key={id}>
          {prompt && <UserMessage messageId={id}>{prompt}</UserMessage>}
          {(answer || isLoading) && (
            <AnswerMessage answer={answer} isLoading={isLoading} source={source} />
          )}
        </Fragment>
      ))}
    </div>
  );
};
