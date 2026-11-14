import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Notifications } from './notifications';

export const mount = (container: HTMLElement) => {
  container.style.width = '100%';
  container.style.height = '100%';

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Notifications />
    </StrictMode>,
  );

  return {
    unmount: () => root.unmount(),
  };
};
