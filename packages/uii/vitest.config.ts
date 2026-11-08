import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '../test-utils/src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['src/test/**', '**/__test__/**'],
    },
    pool: 'forks',
  },
  resolve: {
    alias: {
      '@insta/core': path.resolve(__dirname, '../core/src'),
      test: path.resolve(__dirname, '../test-utils/src/test'),
    },
  },
});
