import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: '../../packages/test-utils/src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      exclude: ['**/__test__/**'],
    },
    pool: 'forks',
  },
  resolve: {
    alias: {
      modules: path.resolve(__dirname, 'src/modules'),
      app: path.resolve(__dirname, 'src/app'),
      '@insta/core': path.resolve(__dirname, '../../packages/core/src'),
      '@insta/ui': path.resolve(__dirname, '../../packages/ui/src'),
      'friends/Friends': path.resolve(
        __dirname,
        'src/modules/friends/__test__/friends-remote-mock.tsx',
      ),
      test: path.resolve(__dirname, '../../packages/test-utils/src/test'),
    },
  },
});
