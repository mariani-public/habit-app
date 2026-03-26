/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';
import biomePlugin from 'vite-plugin-biome';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    biomePlugin({
      mode: 'check',
      files: '.',
      applyFixes: true,
    }),
  ],
  test: {
    root: 'src/',
    setupFiles: ['./setup-tests.ts'],
    browser: {
      provider: playwright(),
      enabled: true,
      // at least one instance is required
      instances: [{ browser: 'chromium' }],
    },
  },
});
