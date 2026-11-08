import { cp, mkdir } from 'node:fs/promises';

const source = new URL('../src/images/', import.meta.url);
const destination = new URL('../dist/images/', import.meta.url);

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
