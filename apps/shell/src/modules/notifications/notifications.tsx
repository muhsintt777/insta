import { useEffect, useRef, useState } from 'react';

type MountState = 'loading' | 'ready' | 'error';

export const Notifications = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mountState, setMountState] = useState<MountState>('loading');

  useEffect(() => {
    let active = true;
    let unmount: (() => void) | undefined;

    import('notifications/mount')
      .then(({ mount }) => {
        const container = containerRef.current;
        if (!active || !container) return;

        const instance = mount(container);
        unmount = instance.unmount;
        setMountState('ready');
      })
      .catch(() => {
        if (active) setMountState('error');
      });

    return () => {
      active = false;
      unmount?.();
    };
  }, []);

  return (
    <>
      {mountState === 'loading' && (
        <div role="status">Loading notifications...</div>
      )}
      {mountState === 'error' && (
        <div role="alert">Could not load notifications.</div>
      )}
      <main ref={containerRef} />
    </>
  );
};
