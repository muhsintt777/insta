import { configureHttp } from '@insta/core/lib/http';
import { refreshAuthToken, signOut } from './session-workflows';
import { store } from './store';

export const setupHttp = () => {
  configureHttp({
    getToken: () => store.getState().auth.token,
    onTokenExpired: () => refreshAuthToken(store.dispatch),
    onSignedOut: () => signOut(store.dispatch),
  });
};
