import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Chat } from './chat';

export const mount = (container: HTMLElement) => {
  container.style.width = '100%';
  container.style.height = '100%';

  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Chat />
    </StrictMode>,
  );

  return {
    unmount: () => root.unmount(),
  };
};
