import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Friends } from './friends';

export const mount = (container: HTMLElement) => {
  container.style.width = '100%';
  container.style.height = '100%';

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Friends />
    </StrictMode>,
  );

  return {
    unmount: () => root.unmount(),
  };
};
