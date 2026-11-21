declare module 'auth/mount' {
  import type { AuthRoute, AuthSessionStatus } from '@insta/contracts';

  export interface AuthMountOptions {
    initialPath: AuthRoute;
    initialSessionStatus: AuthSessionStatus;
  }

  export function mount(
    container: HTMLElement,
    options: AuthMountOptions,
  ): {
    unmount: () => void;
  };
}

declare module 'friends/mount' {
  export function mount(container: HTMLElement): {
    unmount: () => void;
  };
}

declare module 'chat/mount' {
  export function mount(container: HTMLElement): {
    unmount: () => void;
  };
}

declare module 'notifications/mount' {
  export function mount(container: HTMLElement): {
    unmount: () => void;
  };
}

declare module 'posts/mount' {
  export type PostsMountOptions =
    | { surface: 'feed'; profileImage: string | null }
    | { surface: 'profile' };

  export function mount(
    container: HTMLElement,
    options: PostsMountOptions,
  ): {
    unmount: () => void;
  };
}

declare module 'user/mount' {
  import type { User } from 'features/current-user';

  export function mount(
    container: HTMLElement,
    options: {
      user: User;
    },
  ): {
    unmount: () => void;
  };
}
