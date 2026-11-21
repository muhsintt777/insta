import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

const sharedDependencies = Object.keys(dependencies).reduce(
  (acc: Record<string, { singleton: boolean }>, dep) => {
    acc[dep] = { singleton: true };
    return acc;
  },
  {},
);

export default defineConfig({
  base: '/',
  css: {
    modules: {
      generateScopedName: 'auth_[local]_[hash:base36:5]',
    },
  },
  plugins: [
    react(),
    federation({
      name: 'insta_auth',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './mount': './src/mount.tsx',
      },
      shared: sharedDependencies,
    }),
  ],
  server: {
    port: 5179,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5179',
  },
});
