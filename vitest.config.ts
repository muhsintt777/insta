import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/test/setup.ts',
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
      assets: path.resolve(__dirname, 'src/assets'),
      features: path.resolve(__dirname, 'src/features'),
      app: path.resolve(__dirname, 'src/app'),
      shared: path.resolve(__dirname, 'src/shared'),
      'test-utils': path.resolve(__dirname, 'src/test'),
    },
  },
});
