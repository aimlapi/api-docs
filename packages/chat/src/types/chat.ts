export type ChatMessage = {
  id: string;
  prompt: string;
  answer?: string;
  isLoading?: boolean;
  source?: Source[];
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

export type Source = {
  title: string;
  text: string;
  source: string;
};

export type ChatSourceEvent = {
  event: "data";
  data: {
    type: "source";
    source: Source[];
  };
};
