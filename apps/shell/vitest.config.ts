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
      features: path.resolve(__dirname, 'src/features'),
      app: path.resolve(__dirname, 'src/app'),
      remotes: path.resolve(__dirname, 'src/remotes'),
      '@insta/utils': path.resolve(__dirname, '../../packages/utils/src'),
      'friends/Friends': path.resolve(
        __dirname,
        'src/remotes/__test__/friends-remote-mock.tsx',
      ),
      test: path.resolve(__dirname, '../../packages/test-utils/src/test'),
    },
  },
});
