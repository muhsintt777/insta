export function createEventBus<Contracts extends object>() {
  return class EventBus {
    static emit<EventName extends keyof Contracts & string>(
      name: EventName,
      detail: Contracts[EventName],
    ) {
      if (typeof window === 'undefined') return;

      window.dispatchEvent(new CustomEvent(name, { detail }));
    }

    static on<EventName extends keyof Contracts & string>(
      name: EventName,
      listener: (detail: Contracts[EventName]) => void,
    ) {
      if (typeof window === 'undefined') return () => {};

      const handleEvent = (event: Event) => {
        listener((event as CustomEvent<Contracts[EventName]>).detail);
      };

      window.addEventListener(name, handleEvent);
      return () => window.removeEventListener(name, handleEvent);
    }
  };
}
