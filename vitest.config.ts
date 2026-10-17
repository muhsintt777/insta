import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
    pool: 'forks',
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      features: path.resolve(__dirname, 'src/features'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      layouts: path.resolve(__dirname, 'src/layouts'),
      main: path.resolve(__dirname, 'src/main'),
      shared: path.resolve(__dirname, 'src/shared'),
      'test-utils': path.resolve(__dirname, 'src/test-utils'),
    },
  },
});
