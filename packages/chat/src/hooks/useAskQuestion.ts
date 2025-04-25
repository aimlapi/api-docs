import { useMutation } from "@tanstack/react-query";
import { askQuestion } from "../api/ask-question";

export const useAskQuestion = () => {
  return useMutation({
    mutationFn: askQuestion,
  });
};
