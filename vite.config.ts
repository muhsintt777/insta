import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      features: '/src/features',
      app: '/src/app',
      shared: '/src/shared',
      'test-utils': '/src/test',
    },
  },
});
