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
        'modules/buttons/index': resolve(
          packageRoot,
          'src/modules/buttons/index.ts',
        ),
        'modules/modal/index': resolve(
          packageRoot,
          'src/modules/modal/index.ts',
        ),
        'modules/menu/index': resolve(packageRoot, 'src/modules/menu/index.ts'),
        'modules/input-field/index': resolve(
          packageRoot,
          'src/modules/input-field/index.ts',
        ),
        'modules/avatar/index': resolve(
          packageRoot,
          'src/modules/avatar/index.ts',
        ),
        'modules/loaders/index': resolve(
          packageRoot,
          'src/modules/loaders/index.ts',
        ),
        'styles/index': resolve(packageRoot, 'src/styles/index.ts'),
        'modules/toast/index': resolve(
          packageRoot,
          'src/modules/toast/index.ts',
        ),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'styles',
    },
    rollupOptions: {
      external: (id) =>
        id === 'react' || id.startsWith('react/') || id.endsWith('.module.css'),
    },
  },
});
