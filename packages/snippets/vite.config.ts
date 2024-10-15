import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.SNIPPETS_CDN_PREFIX,
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
  };
});
