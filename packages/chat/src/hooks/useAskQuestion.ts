import { useMutation } from "@tanstack/react-query";
import { askQuestion } from "../api/ask-question";
import { showToastError } from "../utils";
import { AxiosError } from "axios";

export const useAskQuestion = () => {
  return useMutation({
    mutationFn: askQuestion,
    onError: (error: AxiosError) => {
      if (error?.response?.status) {
        showToastError(error?.response.status);
      }
    }
  });
};
