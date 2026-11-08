import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'insta_friends',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './Friends': './src/friends.tsx',
      },
      shared: Object.keys(dependencies),
    }),
  ],
  server: {
    port: 5174,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5174',
  },
});
