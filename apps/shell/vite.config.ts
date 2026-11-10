import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

const sharedDependencies = Object.keys(dependencies).filter(
  (dep) => !dep.startsWith('@insta/') || dep === '@insta/ui',
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, 'VITE_');

  return {
    plugins: [
      react(),
      federation({
        name: 'insta_shell',
        dts: false,
        remotes: {
          friends: {
            type: 'module',
            name: 'insta_friends',
            entry: `${env.VITE_FRIENDS_REMOTE_URL}/remoteEntry.js`,
            entryGlobalName: 'insta_friends',
            shareScope: 'default',
          },
        },
        shared: sharedDependencies,
      }),
    ],
    resolve: {
      alias: {
        modules: '/src/modules',
        app: '/src/app',
        '@insta/core': path.resolve(__dirname, '../../packages/core/src'),
        '@insta/http': path.resolve(__dirname, '../../packages/http/src'),
        '@insta/uii': path.resolve(__dirname, '../../packages/uii/src'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  };
});
