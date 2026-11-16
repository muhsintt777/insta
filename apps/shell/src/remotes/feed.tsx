import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import { selectUser, userActions } from 'features/current-user';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { EventBus } from '../shared/event-bus';

type MountState = 'loading' | 'ready' | 'error';

export const Feed = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountState, setMountState] = useState<MountState>('loading');
  const dispatch = useAppDispatch();
  const profileImage = useAppSelector(selectUser).details!.profileImage;

  useEffect(() => {
    let active = true;
    let unmount: (() => void) | undefined;
    const unsubscribe = EventBus.on(MFE_EVENT_NAMES.posts.created, () => {
      dispatch(
        userActions.updateUserResourceCount({
          type: 'increment',
          key: 'postCount',
        }),
      );
    });

    import('posts/mount')
      .then(({ mount }) => {
        const container = containerRef.current;
        if (!active || !container) return;

        const instance = mount(container, { surface: 'feed', profileImage });
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
  }, [dispatch, profileImage]);

  return (
    <>
      {mountState === 'loading' && <div role="status">Loading posts...</div>}
      {mountState === 'error' && <div role="alert">Could not load posts.</div>}
      <main ref={containerRef} />
    </>
  );
};
