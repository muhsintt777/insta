import axios from 'axios';
import { ERROR_TYPE } from './constants';

export interface HttpConfig {
  baseURL: string;
  onSessionExpired: () => Promise<unknown>;
  onSignedOut: () => Promise<unknown>;
}

let handlers: HttpConfig | undefined;
let sessionRefresh: Promise<unknown> | undefined;

export const configureHttp = (config: HttpConfig) => {
  http.defaults.baseURL = config.baseURL;
  handlers = config;
};

const refreshSession = () => {
  if (!sessionRefresh) {
    sessionRefresh = (
      handlers?.onSessionExpired() ?? Promise.resolve()
    ).finally(() => {
      sessionRefresh = undefined;
    });
  }
  return sessionRefresh;
};

export const http = axios.create({
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
    const statusCode = err.status;
    const errorType = err.response?.data?.errorType;
    console.log({ statusCode, errorType });

    if (errorType === ERROR_TYPE.AUTH_TOKEN_EXPIRED) {
      const retryConfig = err.config as typeof err.config & {
        _authRetry?: boolean;
      };
      const isRefreshRequest = retryConfig?.url?.includes('auth/refresh');
      if (!retryConfig || isRefreshRequest || retryConfig._authRetry) throw err;

      retryConfig._authRetry = true;
      await refreshSession();
      return http.request(retryConfig);
    } else if (errorType === ERROR_TYPE.SIGNED_OUT) {
      await handlers?.onSignedOut();
    }

    throw err;
  },
);
