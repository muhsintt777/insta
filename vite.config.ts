import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'public/_redirects', dest: '.' }],
    }),
  ],
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
    },
  },
});
