import '@insta/ui/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Feed, ProfilePosts } from 'features/posts';

export type PostsMountOptions =
  | { surface: 'feed'; profileImage: string | null }
  | { surface: 'profile' };

export const mount = (container: HTMLElement, options: PostsMountOptions) => {
  const root = createRoot(container);
  const content =
    options.surface === 'feed' ? (
      <Feed profileImage={options.profileImage} />
    ) : (
      <ProfilePosts />
    );

  root.render(<StrictMode>{content}</StrictMode>);

  return {
    unmount: () => root.unmount(),
  };
};
