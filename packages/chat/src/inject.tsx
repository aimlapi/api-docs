import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./components/app";
import { toastService } from "./services";
import { ChatProvider } from "./contexts";

const queryClient = new QueryClient();

export const inject = () => {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Root element not found");
  }

  createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChatProvider>
          <App />
        </ChatProvider>
        {toastService.getToastContainer()}
      </QueryClientProvider>
    </StrictMode>
  );
};
