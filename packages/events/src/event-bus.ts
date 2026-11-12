import type { MfeEventContracts, MfeEventName } from './contracts';

export class EventBus {
  static emit<EventName extends MfeEventName>(
    name: EventName,
    detail: MfeEventContracts[EventName],
  ) {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(new CustomEvent(name, { detail }));
  }

  static on<EventName extends MfeEventName>(
    name: EventName,
    listener: (detail: MfeEventContracts[EventName]) => void,
  ) {
    if (typeof window === 'undefined') return () => {};

    const handleEvent = (event: Event) => {
      listener((event as CustomEvent<MfeEventContracts[EventName]>).detail);
    };

    window.addEventListener(name, handleEvent);
    return () => window.removeEventListener(name, handleEvent);
  }
}
