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
    if (
      err.response?.data.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED &&
      err.response?.data.errorType === ERROR_TYPE.AUTH_TOKEN_EXPIRED
    ) {
      try {
        await http.post('auth/refresh');
        return http.request(err.config);
      } catch (refreshError) {
        store.dispatch(logout());
        throw refreshError;
      }
    } else {
      throw err;
    }
  },
);
