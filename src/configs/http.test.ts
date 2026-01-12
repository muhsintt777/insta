import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import axios from 'axios';
import { ERROR_TYPE } from './constants';

// Mock dependencies before importing http
vi.mock('./store', () => ({
  store: {
    getState: vi.fn(() => ({
      auth: { token: 'test-token' },
    })),
    dispatch: vi.fn(),
  },
}));

vi.mock('features/auth/auth-service', () => ({
  AuthService: {
    refreshAuth: vi.fn(),
    signout: vi.fn(),
  },
}));

vi.mock('features/user/user-slice', () => ({
  userActions: {
    logout: vi.fn(() => ({ type: 'user/logout' })),
  },
}));

describe('http config', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  describe('axios instance creation', () => {
    it('creates axios instance with correct baseURL', async () => {
      const { http } = await import('./http');
      expect(http.defaults.baseURL).toBe(
        'https://insta-server-k0gd.onrender.com/api',
      );
    }, 10000);

    it('creates axios instance with correct headers', async () => {
      const { http } = await import('./http');
      expect(http.defaults.headers['Content-Type']).toBe('application/json');
    });

    it('creates axios instance with credentials', async () => {
      const { http } = await import('./http');
      expect(http.defaults.withCredentials).toBe(true);
    });
  });

  describe('request interceptor', () => {
    it('adds authorization token to request headers', async () => {
      const { http } = await import('./http');
      const { store } = await import('./store');

      (store.getState as Mock).mockReturnValue({
        auth: { token: 'bearer-test-token' },
      });

      const config = { headers: {} as Record<string, string> };
      const interceptor = (
        http.interceptors.request as unknown as {
          handlers: Array<{
            fulfilled: (config: { headers: Record<string, string> }) => {
              headers: Record<string, string>;
            };
            rejected: (error: unknown) => unknown;
          }>;
        }
      ).handlers[0];
      const result = interceptor.fulfilled(config);

      expect(result.headers.Authorization).toBe('bearer-test-token');
    });
  });

  describe('response interceptor', () => {
    it('returns response on success', async () => {
      const { http } = await import('./http');

      const interceptor = (
        http.interceptors.response as unknown as {
          handlers: Array<{
            fulfilled: <T>(response: T) => T;
            rejected: (error: unknown) => Promise<unknown>;
          }>;
        }
      ).handlers[0];
      const mockResponse = { data: { message: 'success' } };
      const result = interceptor.fulfilled(mockResponse);

      expect(result).toEqual(mockResponse);
    });

    it('refreshes auth and retries request on AUTH_TOKEN_EXPIRED error', async () => {
      vi.resetModules();

      const mockRefreshAuth = vi.fn().mockResolvedValue({});
      const mockRequest = vi.fn().mockResolvedValue({ data: 'retry-success' });

      vi.doMock('features/auth/auth-service', () => ({
        AuthService: {
          refreshAuth: mockRefreshAuth,
          signout: vi.fn(),
        },
      }));

      const { http } = await import('./http');
      http.request = mockRequest;

      const interceptor = (
        http.interceptors.response as unknown as {
          handlers: Array<{
            fulfilled: <T>(response: T) => T;
            rejected: (error: unknown) => Promise<unknown>;
          }>;
        }
      ).handlers[0];
      const mockError = {
        status: 401,
        response: { data: { errorType: ERROR_TYPE.AUTH_TOKEN_EXPIRED } },
        config: { url: '/test', method: 'GET' },
      };

      await interceptor.rejected(mockError);

      expect(mockRefreshAuth).toHaveBeenCalled();
      expect(mockRequest).toHaveBeenCalledWith(mockError.config);
    });

    it('signs out user on SIGNED_OUT error', async () => {
      vi.resetModules();

      const mockSignout = vi.fn().mockResolvedValue({});
      const mockDispatch = vi.fn();
      const mockLogoutAction = { type: 'user/logout' };

      vi.doMock('features/auth/auth-service', () => ({
        AuthService: {
          refreshAuth: vi.fn(),
          signout: mockSignout,
        },
      }));

      vi.doMock('./store', () => ({
        store: {
          getState: vi.fn(() => ({ auth: { token: 'test-token' } })),
          dispatch: mockDispatch,
        },
      }));

      vi.doMock('features/user/user-slice', () => ({
        userActions: {
          logout: vi.fn(() => mockLogoutAction),
        },
      }));

      const { http } = await import('./http');

      const interceptor = (
        http.interceptors.response as unknown as {
          handlers: Array<{
            fulfilled: <T>(response: T) => T;
            rejected: (error: unknown) => Promise<unknown>;
          }>;
        }
      ).handlers[0];
      const mockError = {
        status: 401,
        response: { data: { errorType: ERROR_TYPE.SIGNED_OUT } },
        config: {},
      };

      // The interceptor throws after handling SIGNED_OUT
      try {
        await interceptor.rejected(mockError);
      } catch {
        // Expected to throw
      }

      expect(mockSignout).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('throws error for other error types', async () => {
      const { http } = await import('./http');

      const interceptor = (
        http.interceptors.response as unknown as {
          handlers: Array<{
            fulfilled: <T>(response: T) => T;
            rejected: (error: unknown) => Promise<unknown>;
          }>;
        }
      ).handlers[0];
      const mockError = {
        status: 500,
        response: { data: { errorType: 'INTERNAL_SERVER_ERROR' } },
        config: {},
      };

      await expect(interceptor.rejected(mockError)).rejects.toEqual(mockError);
    });
  });
});
