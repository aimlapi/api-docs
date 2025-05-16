import { useCallback, useRef } from "react";
import { localStorageService } from "../services";
import { ChatMessage } from "../types/chat";

const LOCAL_STORAGE_KEY_MESSAGES = "ls-key-messages";

export const useSaveMessages = () => {
  const savedMessages = useRef(
    localStorageService.get<ChatMessage[]>(LOCAL_STORAGE_KEY_MESSAGES) || []
  );

  const handleSaveMessages = useCallback((messages: ChatMessage[]) => {
    localStorageService.set(LOCAL_STORAGE_KEY_MESSAGES, messages);
  }, []);

  return {
    savedMessages: savedMessages.current,
    handleSaveMessages
  };
};
