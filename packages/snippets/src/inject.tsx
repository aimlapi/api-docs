import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/app";

export const inject = () => {
  const element = document.createElement("div");

  document.body.append(element);

  createRoot(element).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  injectButtons();
};

export const injectButtons = () => {
  try {
    const buttons = document.querySelectorAll(".api-main-buttom.w-button");
    buttons.forEach((b) => {
      const url = new URL(b.getAttribute("href")!);
      const model = window.location.pathname.match(/\/models\/(.+?)\/?/)?.[1];
      if (model) {
        url.searchParams.set("model", model);
      }

      url.hostname = window.location.hostname;

      b.setAttribute("href", url.toString());
    });
  } catch (error) {
    console.error("failed to update hostnames", error);
  }
};
