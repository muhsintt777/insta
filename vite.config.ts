import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      modules: '/src/modules',
      app: '/src/app',
      shared: '/src/shared',
      test: '/src/test',
    },
  },
});
