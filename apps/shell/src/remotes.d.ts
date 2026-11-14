declare module 'friends/mount' {
  export function mount(container: HTMLElement): {
    unmount: () => void;
  };
}
