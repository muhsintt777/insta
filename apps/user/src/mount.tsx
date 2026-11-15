import '@insta/ui/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProfilePage } from './profile-page';
import type { User } from './user-types';

export interface UserMountOptions {
  user: User;
}

export const mount = (container: HTMLElement, options: UserMountOptions) => {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ProfilePage user={options.user} />
    </StrictMode>,
  );

  return {
    unmount: () => root.unmount(),
  };
};
