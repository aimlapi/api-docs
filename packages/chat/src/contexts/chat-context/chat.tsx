import {
  createContext,
  useCallback,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  RefObject,
  ReactNode
} from "react";
import { v4 as uuid } from "uuid";

import { ChatEvent, ChatMessage } from "../../types";
import { useAskQuestion, useSaveMessages, useScrollBehavior } from "../../hooks";
import { readerToIterable, transformSseToJson, isAnswerEvent, isSourceEvent } from "../../utils";

type ChatContextParams = {
  messages: ChatMessage[];
  input: string;
  isBottomScroll: boolean;
  chatRef: RefObject<HTMLDivElement>;
  setInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  handleScrollToLastMessage: () => void;
  handleEditedMessage: (id: string, newPrompt: string) => void;
  handleInitMessage: () => void;
};

export const ChatContext = createContext<ChatContextParams | undefined>(undefined);

const QUERY_PARAMS_DEFAULT_QUESTION = "defaultQuestion";

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { savedMessages, handleSaveMessages } = useSaveMessages();

  const [messages, setMessages] = useState<ChatMessage[]>(savedMessages);
  const [input, setInput] = useState<string>("");

  const askQuestion = useAskQuestion();

  const { chatRef, handleAdjustLastMessage, handleScrollToLastMessage, isBottomScroll } =
    useScrollBehavior();

  useEffect(() => {
    handleSaveMessages(messages);
  }, [messages, handleSaveMessages]);

  const runTypeMessage = useCallback(async (id: string, iterable: AsyncIterable<ChatEvent>) => {
    for await (const event of iterable) {
      if (isSourceEvent(event)) {
        setMessages((messages) =>
          messages.map((message) =>
            message.id === id
              ? { ...message, source: event.data.source, isLoading: false }
              : message
          )
        );
      }

      if (isAnswerEvent(event)) {
        setMessages((messages) => {
          return messages.map((message) =>
            message.id === id
              ? { ...message, answer: (message.answer || "") + event.data.answer, isLoading: false }
              : message
          );
        });
      }
    }
  }, []);

  const handleEditedMessage = useCallback(
    (id: string, newPrompt: string) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id ? { ...message, prompt: newPrompt, isLoading: true } : message
        )
      );

      askQuestion
        .mutateAsync({ question: newPrompt, history: JSON.stringify(messages) })
        .then((res) => {
          if (res.body) {
            setMessages((prevMessages) =>
              prevMessages.map((message) => {
                if (message.id === id) {
                  return {
                    ...message,
                    answer: "",
                    source: []
                  };
                }

                return message;
              })
            );

            runTypeMessage(
              id,
              readerToIterable(res.body.getReader(), (v) =>
                transformSseToJson(new TextDecoder().decode(v))
              )
            );
          }
        });
    },
    [askQuestion, messages, runTypeMessage]
  );

  const handleSendMessage = useCallback(() => {
    const id = uuid();

    setInput("");
    setMessages((prev) => [...prev, { id, prompt: input, isLoading: true }]);
    handleAdjustLastMessage();

    askQuestion.mutateAsync({ question: input, history: JSON.stringify(messages) }).then((res) => {
      if (res.body) {
        runTypeMessage(
          id,
          readerToIterable(res.body.getReader(), (v) =>
            transformSseToJson(new TextDecoder().decode(v))
          )
        );
      }
    });
  }, [askQuestion, handleAdjustLastMessage, input, messages, runTypeMessage]);

  const handleInitMessage = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const defaultQuestion = urlParams.get(QUERY_PARAMS_DEFAULT_QUESTION) || "";
    const decodedQuestion = decodeURIComponent(defaultQuestion);

    if (!decodedQuestion || messages.length) {
      return;
    }

    const id = uuid();

    setMessages([{ id, prompt: decodedQuestion, isLoading: true }]);

    askQuestion
      .mutateAsync({ question: decodedQuestion, history: JSON.stringify(messages) })
      .then((res) => {
        if (res.body) {
          runTypeMessage(
            id,
            readerToIterable(res.body.getReader(), (v) =>
              transformSseToJson(new TextDecoder().decode(v))
            )
          );
        }
      });
  }, [askQuestion, messages, runTypeMessage]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        handleSendMessage,
        isBottomScroll,
        handleScrollToLastMessage,
        chatRef,
        handleEditedMessage,
        handleInitMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
