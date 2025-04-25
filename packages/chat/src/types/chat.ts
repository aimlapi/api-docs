export type ChatMessage = {
  id: string;
  prompt: string;
  answer?: string;
};

export type ChatEvent = {
  event: string;
  data: Record<string, unknown>;
};

export type ChatAnswerEvent = {
  event: "data";
  data: {
    type: "answer";
    answer: string;
  };
};
