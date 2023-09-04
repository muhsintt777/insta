import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.js',
        // ...
      },
    },
    envDir: '.',
  },
  resolve: {
    alias: {
      'src': '/src',
      'components': '/src/components',
      'assets': '/src/assets',
      'configs': '/src/configs',
      'utils': '/src/utils',
    }
  }
})
