import { ChatSourceEvent, ChatEvent } from "../../types/chat";

export const isSourceEvent = (event: ChatEvent): event is ChatSourceEvent =>
  event.data?.type === "source";
