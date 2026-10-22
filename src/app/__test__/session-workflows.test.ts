import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService, authActions } from 'features/auth';
import { UserService, userActions } from 'features/user';
import type { User } from 'features/user';
import { signIn } from '../session-workflows';

describe('session workflows', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loads the current user before completing sign-in', async () => {
    const profile = { id: 'user-1' } as User;
    const dispatch = vi.fn();
    vi.spyOn(AuthService, 'login').mockResolvedValue('Bearer token');
    vi.spyOn(UserService, 'fetchCurrentUser').mockResolvedValue(profile);

    await signIn(dispatch, {
      email: 'person@example.com',
      password: 'Password@123',
    });

    expect(UserService.fetchCurrentUser).toHaveBeenCalledOnce();
    expect(dispatch.mock.calls.map(([action]) => action)).toEqual([
      authActions.sessionLoading(),
      authActions.setToken('Bearer token'),
      userActions.setProfile(profile),
      authActions.sessionAuthenticated(),
    ]);
  });

  it('fails sign-in and clears the user if profile loading fails', async () => {
    const error = new Error('Profile request failed');
    const dispatch = vi.fn();
    vi.spyOn(AuthService, 'login').mockResolvedValue('Bearer token');
    vi.spyOn(UserService, 'fetchCurrentUser').mockRejectedValue(error);

    await expect(
      signIn(dispatch, {
        email: 'person@example.com',
        password: 'Password@123',
      }),
    ).rejects.toBe(error);

    expect(dispatch.mock.calls.slice(-2).map(([action]) => action)).toEqual([
      authActions.sessionFailed(),
      userActions.clearProfile(),
    ]);
  });
});
