import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'app/hooks/redux-hooks';
import { userActions } from './user-slice';
import { EventBus, MFE_EVENT_NAMES } from '@insta/events';

type MountState = 'loading' | 'ready' | 'error';

export const ProfilePosts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountState, setMountState] = useState<MountState>('loading');
  const dispatch = useAppDispatch();

  useEffect(() => {
    let active = true;
    let unmount: (() => void) | undefined;
    const unsubscribe = EventBus.on(MFE_EVENT_NAMES.posts.deleted, () => {
      dispatch(
        userActions.updateUserResourceCount({
          type: 'decrement',
          key: 'postCount',
        }),
      );
    });

    import('posts/mount')
      .then(({ mount }) => {
        const container = containerRef.current;
        if (!active || !container) return;

        const instance = mount(container, { surface: 'profile' });
        unmount = instance.unmount;
        setMountState('ready');
      })
      .catch(() => {
        if (active) setMountState('error');
      });

    return () => {
      active = false;
      unsubscribe();
      unmount?.();
    };
  }, [dispatch]);

  return (
    <>
      {mountState === 'loading' && <div role="status">Loading posts...</div>}
      {mountState === 'error' && <div role="alert">Could not load posts.</div>}
      <div ref={containerRef} />
    </>
  );
};
