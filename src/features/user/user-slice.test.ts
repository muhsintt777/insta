import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  userSlice,
  userActions,
  userReducer,
  initialUserFetch,
} from './user-slice';
import { configureStore } from '@reduxjs/toolkit';
import { UserService } from './user-service';
import { AuthService } from 'features/auth/auth-service';

vi.mock('./user-service', () => ({
  UserService: {
    fetchCurrentUser: vi.fn(),
  },
}));

vi.mock('features/auth/auth-service', () => ({
  AuthService: {
    refreshAuth: vi.fn(),
  },
}));

describe('userSlice', () => {
  const mockUser = {
    id: 'user-1',
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    profileImage: null,
    bio: 'Test bio',
    postCount: 10,
    friendsCount: 5,
  };

  describe('reducers', () => {
    it('logout should set status to LOGGED_OUT and details to null', () => {
      const state = {
        status: 'SUCCESS' as const,
        details: mockUser,
      };

      const newState = userReducer(state, userActions.logout());

      expect(newState.status).toBe('LOGGED_OUT');
      expect(newState.details).toBeNull();
    });

    it('login should set status to SUCCESS and store user details', () => {
      const state = {
        status: 'LOADING' as const,
        details: null,
      };

      const newState = userReducer(state, userActions.login(mockUser));

      expect(newState.status).toBe('SUCCESS');
      expect(newState.details).toEqual(mockUser);
    });

    describe('updateUserResourceCount', () => {
      it('increments postCount', () => {
        const state = {
          status: 'SUCCESS' as const,
          details: { ...mockUser, postCount: 10 },
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'increament',
            key: 'postCount',
          }),
        );

        expect(newState.details?.postCount).toBe(11);
      });

      it('decrements postCount', () => {
        const state = {
          status: 'SUCCESS' as const,
          details: { ...mockUser, postCount: 10 },
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'decreament',
            key: 'postCount',
          }),
        );

        expect(newState.details?.postCount).toBe(9);
      });

      it('increments friendsCount', () => {
        const state = {
          status: 'SUCCESS' as const,
          details: { ...mockUser, friendsCount: 5 },
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'increament',
            key: 'friendsCount',
          }),
        );

        expect(newState.details?.friendsCount).toBe(6);
      });

      it('does nothing when status is not SUCCESS', () => {
        const state = {
          status: 'LOADING' as const,
          details: null,
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'increament',
            key: 'postCount',
          }),
        );

        expect(newState.details).toBeNull();
      });
    });

    describe('editUser', () => {
      it('updates user details partially', () => {
        const state = {
          status: 'SUCCESS' as const,
          details: mockUser,
        };

        const newState = userReducer(
          state,
          userActions.editUser({ fullName: 'Jane Doe', bio: 'New bio' }),
        );

        expect(newState.details?.fullName).toBe('Jane Doe');
        expect(newState.details?.bio).toBe('New bio');
        expect(newState.details?.email).toBe('john@example.com');
      });

      it('does nothing when status is not SUCCESS', () => {
        const state = {
          status: 'LOADING' as const,
          details: null,
        };

        const newState = userReducer(
          state,
          userActions.editUser({ fullName: 'Jane Doe' }),
        );

        expect(newState.details).toBeNull();
      });
    });
  });

  describe('extraReducers - initialUserFetch', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('sets status to LOADING when pending', () => {
      const store = configureStore({ reducer: { user: userReducer } });

      store.dispatch(initialUserFetch.pending('requestId'));

      expect(store.getState().user.status).toBe('LOADING');
      expect(store.getState().user.details).toBeNull();
    });

    it('sets status to SUCCESS and stores user on fulfilled', async () => {
      (AuthService.refreshAuth as ReturnType<typeof vi.fn>).mockResolvedValue(
        undefined,
      );
      (
        UserService.fetchCurrentUser as ReturnType<typeof vi.fn>
      ).mockResolvedValue(mockUser);

      const store = configureStore({ reducer: { user: userReducer } });

      await store.dispatch(initialUserFetch());

      expect(store.getState().user.status).toBe('SUCCESS');
      expect(store.getState().user.details).toEqual(mockUser);
    });

    it('sets status to FAILED on rejected', () => {
      const store = configureStore({ reducer: { user: userReducer } });

      store.dispatch(
        initialUserFetch.rejected(new Error('Fetch failed'), 'requestId'),
      );

      expect(store.getState().user.status).toBe('FAILED');
      expect(store.getState().user.error).toBe('Fetch failed');
    });
  });
});
