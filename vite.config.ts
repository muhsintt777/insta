import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      configs: '/src/configs',
      features: '/src/features',
      hooks: '/src/hooks',
      layouts: '/src/layouts',
      main: '/src/main',
      utils: '/src/utils',
      'test-utils': '/src/test-utils',
    },
  },
});
