import { ChatMessages } from "../chat-viewer/messages/chat-messages";
import { ChatContainer } from "../chat-viewer/chat-container";

import { ChatInput } from "../chat-viewer/chat-input";
import { memo, useEffect } from "react";
import { useChat } from "../../hooks";

const App = memo(() => {
  const { handleInitMessage } = useChat();

  useEffect(() => {
    handleInitMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ChatContainer>
      <ChatMessages />
      <ChatInput placeholder="Ask anything" />
    </ChatContainer>
  );
});

export default App;
