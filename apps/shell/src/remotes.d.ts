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
