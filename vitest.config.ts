import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 20000,
  },
  esbuild: {
    target: 'node14',
  },
});
