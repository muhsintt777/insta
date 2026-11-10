import { configureHttp } from '@insta/http';
import { refreshAuthToken, signOut } from './session-workflows';
import { store } from './store';

export const setupHttp = () => {
  configureHttp({
    baseURL: import.meta.env.VITE_API_URL,
    getToken: () => store.getState().auth.token,
    onTokenExpired: () => refreshAuthToken(store.dispatch),
    onSignedOut: () => signOut(store.dispatch),
  });
};
