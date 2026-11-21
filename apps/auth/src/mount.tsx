import '@insta/ui/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { AuthApp } from './auth-app';
import type { AuthMountOptions } from './mount-types';

export type { AuthMountOptions } from './mount-types';

export const mount = (container: HTMLElement, options: AuthMountOptions) => {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <MemoryRouter initialEntries={[options.initialPath]}>
        <AuthApp {...options} />
      </MemoryRouter>
    </StrictMode>,
  );

  return {
    unmount: () => root.unmount(),
  };
};
