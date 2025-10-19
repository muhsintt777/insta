import axios from 'axios';
import { userActions } from 'features/user/user-slice';
import { AuthService } from 'features/auth/auth-service';
import { ERROR_TYPE, HTTP_STATUS_CODES } from './constants';
import { store } from './store';
import { ENV } from './env';

export const http = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const { token } = store.getState().auth;
  config.headers.Authorization = token;
  return config;
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const statusCode = err.status;
    const errorType = err.response?.data?.errorType;

    console.log({ statusCode, errorType });

    if (
      statusCode === HTTP_STATUS_CODES.UNAUTHORIZED &&
      errorType === ERROR_TYPE.AUTH_TOKEN_EXPIRED
    ) {
      await AuthService.refreshAuth();
      return http.request(err.config);
    } else if (
      statusCode === HTTP_STATUS_CODES.UNAUTHORIZED &&
      errorType === ERROR_TYPE.AUTH_UNAUTHORIZED
    ) {
      store.dispatch(userActions.logout());
      // await AuthService.signout();
    }

    throw err;
  },
);
