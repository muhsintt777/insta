import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'insta_shell',
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: {
      modules: '/src/modules',
      app: '/src/app',
      '@insta/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
});
