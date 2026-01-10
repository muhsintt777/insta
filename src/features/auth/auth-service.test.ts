import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { http } from 'configs/http';
import { store } from 'configs/store';
import { HTTP_STATUS_CODES, ERROR_TYPE } from 'configs/constants';
import { AuthService } from './auth-service';
import { authActions } from './auth-slice';

vi.mock('configs/http', () => ({
  http: {
    post: vi.fn(),
  },
}));

vi.mock('configs/store', () => ({
  store: {
    dispatch: vi.fn(),
  },
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    const createUserParams = {
      email: 'test@example.com',
      password: 'Password@123',
      fullName: 'John Doe',
      username: 'johndoe',
    };

    it('creates user successfully', async () => {
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.CREATED,
      });

      await expect(
        AuthService.createUser(createUserParams),
      ).resolves.toBeUndefined();

      expect(http.post).toHaveBeenCalledWith('users', expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });

    it('creates user with profile image', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const paramsWithImage = { ...createUserParams, profileImage: mockFile };

      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.CREATED,
      });

      await AuthService.createUser(paramsWithImage);

      expect(http.post).toHaveBeenCalledWith('users', expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });

    it('throws error when user creation fails', async () => {
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.BAD_REQUEST,
      });

      await expect(
        AuthService.createUser(createUserParams),
      ).rejects.toMatchObject({
        errorType: ERROR_TYPE.UNKNOWN_API_ERROR,
        message: 'Failed to create user',
      });
    });
  });

  describe('login', () => {
    const loginParams = {
      email: 'test@example.com',
      password: 'Password@123',
    };

    it('logs in successfully with email and password', async () => {
      const mockToken = 'mock-access-token';
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.OK,
        data: { data: { accessToken: mockToken } },
      });

      await AuthService.login(loginParams);

      expect(http.post).toHaveBeenCalledWith('auth/login', loginParams);
      expect(store.dispatch).toHaveBeenCalledWith(
        authActions.setToken(`Bearer ${mockToken}`),
      );
    });

    it('logs in successfully with username and password', async () => {
      const usernameLoginParams = {
        username: 'johndoe',
        password: 'Password@123',
      };
      const mockToken = 'mock-access-token';
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.OK,
        data: { data: { accessToken: mockToken } },
      });

      await AuthService.login(usernameLoginParams);

      expect(http.post).toHaveBeenCalledWith('auth/login', usernameLoginParams);
    });

    it('throws error when login fails', async () => {
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.UNAUTHORIZED,
      });

      await expect(AuthService.login(loginParams)).rejects.toMatchObject({
        errorType: ERROR_TYPE.UNKNOWN_API_ERROR,
        message: 'Failed to login',
      });
    });
  });

  describe('signout', () => {
    it('signs out successfully', async () => {
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.OK,
      });

      await AuthService.signout();

      expect(http.post).toHaveBeenCalledWith('auth/logout');
      expect(store.dispatch).toHaveBeenCalledWith(authActions.clearToken());
    });

    it('throws error when signout fails', async () => {
      (http.post as Mock).mockResolvedValue({
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      });

      await expect(AuthService.signout()).rejects.toMatchObject({
        errorType: ERROR_TYPE.UNKNOWN_API_ERROR,
        message: 'Failed to logout',
      });
    });
  });

  describe('refreshAuth', () => {
    it('refreshes auth successfully', async () => {
      const mockToken = 'new-access-token';
      (http.post as Mock).mockResolvedValue({
        data: { data: { accessToken: mockToken } },
      });

      await AuthService.refreshAuth();

      expect(http.post).toHaveBeenCalledWith('auth/refresh');
      expect(store.dispatch).toHaveBeenCalledWith(
        authActions.setToken(`Bearer ${mockToken}`),
      );
    });

    it('throws error when refresh fails', async () => {
      (http.post as Mock).mockResolvedValue({
        data: { errorType: 'AUTH_TOKEN_EXPIRED' },
      });

      await expect(AuthService.refreshAuth()).rejects.toThrow(
        'Failed to refresh auth',
      );
    });
  });
});
