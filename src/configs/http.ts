import axios from 'axios';
import { logout } from 'features/user/userSlice';
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

http.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const statusCode = err.response?.data?.statusCode;
    const errorType = err.response?.data?.errorType;

    if (
      statusCode === HTTP_STATUS_CODES.UNAUTHORIZED &&
      errorType === ERROR_TYPE.AUTH_TOKEN_EXPIRED
    ) {
      await http.post('auth/refresh');
      return http.request(err.config);
    } else if (
      statusCode === HTTP_STATUS_CODES.UNAUTHORIZED &&
      errorType !== ERROR_TYPE.AUTH_TOKEN_EXPIRED
    ) {
      store.dispatch(logout());
    }

    throw err;
  },
);
