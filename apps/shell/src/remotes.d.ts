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
