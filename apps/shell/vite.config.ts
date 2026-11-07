import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

const sharedDependencies = Object.keys(dependencies).filter(
  (dep) => !dep.startsWith('@insta/'),
);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'insta_shell',
      shared: sharedDependencies,
    }),
  ],
  resolve: {
    alias: {
      modules: '/src/modules',
      app: '/src/app',
      '@insta/core': path.resolve(__dirname, '../../packages/core/src'),
      '@insta/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
