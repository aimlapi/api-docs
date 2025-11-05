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
  console.log("snippets injected");

  injectButtons();
};

export const injectButtons = () => {
  try {
    let attempts = 0;
    const intervalId = setInterval(() => {
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

      if (attempts > 20) {
        console.error("failed to inject hostnames: timeout exceeded");
        clearInterval(intervalId);
      }

      if (buttons.length > 0) {
        console.error("hostnames injected");
        clearInterval(intervalId);
      } else {
        console.warn("failed to inject hostnames: no buttons detected");
        attempts += 1;
      }
    }, 1000);
  } catch (error) {
    console.error("failed to update hostnames", error);
  }
};
