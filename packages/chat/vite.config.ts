import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.CHAT_CDN_PREFIX,
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: "app.html",
        output: {
          entryFileNames: "bundle.js",
          assetFileNames: "bundle.css",
        },
      },
    },
    assetsInclude: ["**/*.hbs"],
  };
});
