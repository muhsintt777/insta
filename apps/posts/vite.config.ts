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

export default defineConfig(({ mode }) => ({
  base: mode === 'prod' ? '/posts/' : '/',
  plugins: [
    react(),
    federation({
      name: 'insta_posts',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './mount': './src/mount.tsx',
      },
      shared: sharedDependencies,
    }),
  ],
  resolve: {
    alias: {
      modules: '/src/modules',
      app: '/src/app',
    },
  },
  server: {
    port: 5177,
    strictPort: true,
    cors: true,
    origin: 'http://localhost:5177',
  },
}));
