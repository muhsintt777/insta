import { configureHttp } from 'shared/lib/http';
import { refreshAuthToken, signOut } from 'features/auth';
import { store } from './store';

export const setupHttp = () => {
  configureHttp({
    getToken: () => store.getState().auth.token,
    onTokenExpired: () => refreshAuthToken(store.dispatch),
    onSignedOut: () => signOut(store.dispatch),
  });
};
