import { toastService } from "../services";

export const showToastError = (status: number) => {
  switch (status) {
    case 429:
      toastService.error("You have sent too many requests.");
      return;
    case 500:
      toastService.error("Sorry, chat is not available");
      return;
    default:
      toastService.error("Sorry, something went wrong try later");
      return;
  }
};
