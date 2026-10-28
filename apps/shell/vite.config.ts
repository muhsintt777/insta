import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      modules: '/src/modules',
      app: '/src/app',
      '@insta/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
});
