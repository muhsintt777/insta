import { MFE_EVENT_NAMES, type AuthRoute } from '@insta/contracts';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventBus } from './event-bus';

const isAuthRoute = (path: string): path is AuthRoute =>
  path === '/login' || path === '/signup';

export const NavigationBridge = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialLocation = useRef(true);

  useEffect(() => {
    return EventBus.on(MFE_EVENT_NAMES.auth.navigationSync, ({ path }) => {
      if (!isAuthRoute(path) || location.pathname === path) return;
      navigate(path, { replace: true, state: { source: 'shell' } });
    });
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (isInitialLocation.current) {
      isInitialLocation.current = false;
      return;
    }

    const state = location.state as {
      source?: 'shell' | 'mfe';
      intent?: 'push' | 'replace';
    } | null;
    if (state?.source === 'shell' || !isAuthRoute(location.pathname)) return;

    EventBus.emit(MFE_EVENT_NAMES.auth.navigationRequested, {
      path: location.pathname,
      intent: state?.intent ?? 'push',
    });
  }, [location.pathname, location.state]);

  return null;
};
