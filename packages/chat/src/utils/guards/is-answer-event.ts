import { ChatAnswerEvent, ChatEvent } from "../../types/chat";

export const isAnswerEvent = (event: ChatEvent): event is ChatAnswerEvent =>
  event.data?.type === "answer";
