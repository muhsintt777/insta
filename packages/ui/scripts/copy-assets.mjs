import { cp, mkdir } from 'node:fs/promises';

const source = new URL('../src/images/', import.meta.url);
const destination = new URL('../dist/images/', import.meta.url);
const loaderStyles = new URL(
  '../src/components/loaders/loaderStyle.module.css',
  import.meta.url,
);
const builtLoaderStyles = new URL(
  '../dist/components/loaders/loaderStyle.module.css',
  import.meta.url,
);

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
await mkdir(new URL('../dist/components/loaders/', import.meta.url), {
  recursive: true,
});
await cp(loaderStyles, builtLoaderStyles);
