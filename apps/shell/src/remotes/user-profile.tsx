import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import { selectUser, userActions } from 'features/current-user';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { EventBus } from '../shared/event-bus';

type MountInstance = { unmount: () => void };

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(selectUser).details;
  const userRef = useRef(userDetails);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<MountInstance>();
  const [mountState, setMountState] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  userRef.current = userDetails;

  useEffect(() => {
    const unsubscribeUserUpdated = EventBus.on(
      MFE_EVENT_NAMES.user.updated,
      (user) => dispatch(userActions.setProfile(user)),
    );
    const unsubscribeNavigationBack = EventBus.on(
      MFE_EVENT_NAMES.navigation.back,
      () => navigate(-1),
    );

    const container = containerRef.current;
    const user = userRef.current;
    if (!container || !user) {
      unsubscribeUserUpdated();
      unsubscribeNavigationBack();
      return;
    }

    let active = true;
    import('user/mount')
      .then(({ mount }) => {
        if (!active) return;
        mountRef.current = mount(container, {
          user,
        });
        setMountState('ready');
      })
      .catch(() => {
        if (active) setMountState('error');
      });

    return () => {
      active = false;
      unsubscribeUserUpdated();
      unsubscribeNavigationBack();
      mountRef.current?.unmount();
      mountRef.current = undefined;
    };
  }, [dispatch, navigate]);

  return (
    <>
      {mountState === 'loading' && <div role="status">Loading profile...</div>}
      {mountState === 'error' && (
        <div role="alert">Could not load profile.</div>
      )}
      <div ref={containerRef} />
    </>
  );
};
