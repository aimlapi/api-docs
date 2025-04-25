import { v4 as uuid } from "uuid";
import { useCallback, useEffect, useState } from "react";
import { ChatEvent, ChatMessage } from "../../types/chat";
import { ChatMessages } from "../chat-viewer/chat-messages";
import { ChatContainer } from "../chat-viewer/chat-container";
import { ChatInput } from "../chat-viewer/chat-input";
import { useAskQuestion } from "../../hooks/useAskQuestion";
import { readerToIterable } from "../../utils/reader-to-iterable";
import { transformSseToJson } from "../../utils/sse-to-json";
import { isAnswerEvent } from "../../utils/guards/is-answer-event";

const App = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const askQuestion = useAskQuestion();

  const runTypeMessage = useCallback(
    async (id: string, iterable: AsyncIterable<ChatEvent>) => {
      for await (const event of iterable) {
        if (!isAnswerEvent(event)) {
          return;
        }

        setMessages((m) =>
          m.map((v) =>
            v.id === id
              ? { ...v, answer: (v.answer || "") + event.data.answer }
              : v
          )
        );
      }
    },
    []
  );

  const handleInput = useCallback((ev: React.ChangeEvent) => {
    setInput((ev.currentTarget as HTMLInputElement).value);
  }, []);

  const handleSubmit = useCallback(() => {
    const id = uuid();
    setInput("");
    setMessages((prev) => [...prev, { id, prompt: input }]);
    askQuestion
      .mutateAsync({ question: input, history: JSON.stringify(messages) })
      .then((res) =>
        res.body
          ? runTypeMessage(
              id,
              readerToIterable(res.body.getReader(), (v) =>
                transformSseToJson(new TextDecoder().decode(v))
              )
            )
          : null
      );
  }, [askQuestion, input, messages, runTypeMessage]);

  useEffect(() => {
    function notifyEmbedSize() {
      const h = document.body.scrollHeight;
      window.parent.postMessage({ type: "embed-size", height: h }, "*");
    }

    window.addEventListener("load", notifyEmbedSize);
    window.addEventListener("resize", notifyEmbedSize);

    // For dynamically changing content
    const observer = new MutationObserver(notifyEmbedSize);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    notifyEmbedSize();

    return () => {
      window.removeEventListener("load", notifyEmbedSize);
      window.removeEventListener("resize", notifyEmbedSize);
      observer.disconnect();
    };
  });

  return (
    <ChatContainer>
      <ChatMessages messages={messages} />
      <ChatInput value={input} onChange={handleInput} onSubmit={handleSubmit} />
    </ChatContainer>
  );
};

export default App;
