import { configureHttp } from 'shared/lib/http';
import { AuthService } from 'features/auth/auth-service';
import { userActions } from 'features/user/user-slice';
import { store } from './store';

export const setupHttp = () => {
  configureHttp({
    getToken: () => store.getState().auth.token,
    onTokenExpired: () => AuthService.refreshAuth(),
    onSignedOut: async () => {
      await AuthService.signout();
      store.dispatch(userActions.logout());
    },
  });
};
