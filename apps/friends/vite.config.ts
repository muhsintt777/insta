import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

const sharedDependencies = Object.keys(dependencies).filter(
  (dependency) => !dependency.startsWith('@insta/'),
);

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
      shared: sharedDependencies,
    }),
  ],
  resolve: {
    alias: {
      '@insta/uii': path.resolve(__dirname, '../../packages/uii/src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5174',
  },
});
