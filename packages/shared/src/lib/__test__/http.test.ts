import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ERROR_TYPE } from '../../constants';
import { http, configureHttp } from '../http';

type RequestHandler = {
  fulfilled: (config: { headers: Record<string, unknown> }) => {
    headers: Record<string, unknown>;
  };
};

type ResponseHandler = {
  fulfilled: <T>(response: T) => T;
  rejected: (error: unknown) => Promise<unknown>;
};

const requestInterceptor = (
  http.interceptors.request as unknown as { handlers: RequestHandler[] }
).handlers[0];

const responseInterceptor = (
  http.interceptors.response as unknown as { handlers: ResponseHandler[] }
).handlers[0];

describe('http', () => {
  const getToken = vi.fn();
  const onTokenExpired = vi.fn();
  const onSignedOut = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    getToken.mockReturnValue('bearer-test-token');
    onTokenExpired.mockResolvedValue({});
    onSignedOut.mockResolvedValue({});
    configureHttp({ getToken, onTokenExpired, onSignedOut });
  });

  describe('axios instance creation', () => {
    it('creates axios instance with correct baseURL', () => {
      expect(http.defaults.baseURL).toBe(import.meta.env.VITE_API_URL);
    });

    it('creates axios instance with correct headers', () => {
      expect(http.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('creates axios instance with credentials', () => {
      expect(http.defaults.withCredentials).toBe(true);
    });
  });

  describe('request interceptor', () => {
    it('adds authorization token to request headers', () => {
      const result = requestInterceptor.fulfilled({ headers: {} });

      expect(result.headers.Authorization).toBe('bearer-test-token');
    });
  });

  describe('response interceptor', () => {
    it('returns response on success', () => {
      const mockResponse = { data: { message: 'success' } };

      expect(responseInterceptor.fulfilled(mockResponse)).toEqual(mockResponse);
    });

    it('refreshes auth and retries request on AUTH_TOKEN_EXPIRED error', async () => {
      const mockRequest = vi
        .spyOn(http, 'request')
        .mockResolvedValue({ data: 'retry-success' });
      const mockError = {
        status: 401,
        response: { data: { errorType: ERROR_TYPE.AUTH_TOKEN_EXPIRED } },
        config: { url: '/test', method: 'GET' },
      };

      await responseInterceptor.rejected(mockError);

      expect(onTokenExpired).toHaveBeenCalled();
      expect(mockRequest).toHaveBeenCalledWith(mockError.config);
    });

    it('calls onSignedOut and rethrows on SIGNED_OUT error', async () => {
      const mockError = {
        status: 401,
        response: { data: { errorType: ERROR_TYPE.SIGNED_OUT } },
        config: {},
      };

      await expect(responseInterceptor.rejected(mockError)).rejects.toEqual(
        mockError,
      );

      expect(onSignedOut).toHaveBeenCalled();
    });

    it('throws error for other error types', async () => {
      const mockError = {
        status: 500,
        response: { data: { errorType: 'INTERNAL_SERVER_ERROR' } },
        config: {},
      };

      await expect(responseInterceptor.rejected(mockError)).rejects.toEqual(
        mockError,
      );
    });
  });
});
