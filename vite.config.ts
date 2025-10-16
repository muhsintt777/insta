import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
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
    },
  },
});

// import { viteStaticCopy } from 'vite-plugin-static-copy';
// viteStaticCopy({
//       targets: [{ src: 'public/_redirects', dest: '.' }],
//     }),
