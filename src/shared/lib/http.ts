import axios from 'axios';
import { ERROR_TYPE } from 'shared/constants';
import { ENV } from './env';

interface HttpHandlers {
  getToken: () => string | null;
  onTokenExpired: () => Promise<unknown>;
  onSignedOut: () => Promise<unknown>;
}

let handlers: HttpHandlers | undefined;

// Called once at startup so this module does not depend on the store or features.
export const configureHttp = (config: HttpHandlers) => {
  handlers = config;
};

export const http = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = handlers?.getToken();
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

    if (errorType === ERROR_TYPE.AUTH_TOKEN_EXPIRED) {
      await handlers?.onTokenExpired();
      return http.request(err.config);
    } else if (errorType === ERROR_TYPE.SIGNED_OUT) {
      await handlers?.onSignedOut();
    }

    throw err;
  },
);
