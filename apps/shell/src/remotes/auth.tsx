import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MFE_EVENT_NAMES, type AuthRoute } from '@insta/contracts';
import { useAppSelector } from 'app/hooks/redux-hooks';
import { selectAuthStatus } from 'features/auth';
import { EventBus } from '../shared/event-bus';

type MountInstance = { unmount: () => void };
type MountState = 'loading' | 'ready' | 'error';

const getAuthPath = (pathname: string): AuthRoute =>
  pathname === '/auth/signup' ? '/signup' : '/login';

export const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authStatus = useAppSelector(selectAuthStatus);
  const locationRef = useRef(location);
  const initialPathRef = useRef(getAuthPath(location.pathname));
  const initialStatusRef = useRef(authStatus);
  const containerRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<MountInstance>();
  const [mountState, setMountState] = useState<MountState>('loading');

  locationRef.current = location;

  useEffect(() => {
    return EventBus.on(MFE_EVENT_NAMES.auth.navigationRequested, (detail) => {
      const targetPath = `/auth${detail.path}`;
      if (locationRef.current.pathname === targetPath) return;
      navigate(targetPath, { replace: detail.intent === 'replace' });
    });
  }, [navigate]);

  useEffect(() => {
    const path = getAuthPath(location.pathname);
    const targetPath = `/auth${path}`;
    if (location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
      return;
    }

    EventBus.emit(MFE_EVENT_NAMES.auth.navigationSync, { path });
  }, [location.pathname, navigate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;
    import('auth/mount')
      .then(({ mount }) => {
        if (!active) return;
        mountRef.current = mount(container, {
          initialPath: initialPathRef.current,
          initialSessionStatus: initialStatusRef.current,
        });
        setMountState('ready');
      })
      .catch(() => {
        if (active) setMountState('error');
      });

    return () => {
      active = false;
      mountRef.current?.unmount();
      mountRef.current = undefined;
    };
  }, []);

  return (
    <>
      {mountState === 'loading' && <div role="status">Loading auth...</div>}
      {mountState === 'error' && <div role="alert">Could not load auth.</div>}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </>
  );
};
