import { configureHttp } from 'shared/lib/http';
import { AuthService, authActions } from 'features/auth';
import { userActions } from 'features/user/user-slice';
import { store } from './store';

export const setupHttp = () => {
  configureHttp({
    getToken: () => store.getState().auth.token,
    onTokenExpired: async () => {
      const token = await AuthService.refreshAuth();
      store.dispatch(authActions.setToken(token));
    },
    onSignedOut: async () => {
      await AuthService.signout();
      store.dispatch(authActions.clearToken());
      store.dispatch(userActions.logout());
    },
  });
};
