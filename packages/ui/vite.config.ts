import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const packageRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(packageRoot, 'src/index.ts'),
        'icons/index': resolve(packageRoot, 'src/icons/index.ts'),
        'components/buttons/index': resolve(
          packageRoot,
          'src/components/buttons/index.ts',
        ),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: (id) =>
        id === 'react' || id.startsWith('react/') || id.endsWith('.module.css'),
    },
  },
});
