import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'insta_chat',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './mount': './src/mount.tsx',
      },
      shared: Object.keys(dependencies),
    }),
  ],
  server: {
    port: 5175,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5175',
  },
});
