import { configureHttp } from '@insta/http';
import { refreshSession, signOut } from './session-workflows';
import { store } from './store';

export const setupHttp = () => {
  configureHttp({
    baseURL: import.meta.env.VITE_API_URL,
    onSessionExpired: refreshSession,
    onSignedOut: () => signOut(store.dispatch),
  });
};
