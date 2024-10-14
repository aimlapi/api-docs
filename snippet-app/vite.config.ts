import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://cdn.jsdelivr.net/gh/aimlapi/api-docs/snippet-app/dist',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: 'bundle.css',
      },
    },
  },
  assetsInclude: ['**/*.hbs'],
});
