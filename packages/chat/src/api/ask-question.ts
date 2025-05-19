import { fetchClient } from "./client";

export type Payload = {
  question: string;
  history: string;
};

export const askQuestion = (payload: Payload) => {
  return fetchClient.post("/v1/docs/question", payload, {
    headers: { "Content-Type": "application/json" }
  });
};
