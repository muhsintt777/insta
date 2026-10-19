import { describe, it, expect } from 'vitest';
import { userActions, userReducer } from '../user-slice';
import type { User, UserState, UserSuccessState } from '../user-types';

describe('userSlice', () => {
  const mockUser: User = {
    id: 'user-1',
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    profileImage: null,
    bio: 'Test bio',
    postCount: 10,
    friendsCount: 5,
    gender: null,
    mobileNo: null,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  };

  describe('reducers', () => {
    it('logout should set status to LOGGED_OUT and details to null', () => {
      const state: UserSuccessState = {
        status: 'SUCCESS',
        details: mockUser,
      };

      const newState = userReducer(state, userActions.logout());

      expect(newState.status).toBe('LOGGED_OUT');
      expect(newState.details).toBeNull();
    });

    it('login should set status to SUCCESS and store user details', () => {
      const state: UserState = {
        status: 'LOADING',
        details: null,
      };

      const newState = userReducer(state, userActions.login(mockUser));

      expect(newState.status).toBe('SUCCESS');
      expect(newState.details).toEqual(mockUser);
    });

    describe('updateUserResourceCount', () => {
      it('increments postCount', () => {
        const state: UserSuccessState = {
          status: 'SUCCESS',
          details: { ...mockUser, postCount: 10 },
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'increment',
            key: 'postCount',
          }),
        );

        expect(newState.details?.postCount).toBe(11);
      });

      it('decrements postCount', () => {
        const state: UserSuccessState = {
          status: 'SUCCESS',
          details: { ...mockUser, postCount: 10 },
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'decrement',
            key: 'postCount',
          }),
        );

        expect(newState.details?.postCount).toBe(9);
      });

      it('increments friendsCount', () => {
        const state: UserSuccessState = {
          status: 'SUCCESS',
          details: { ...mockUser, friendsCount: 5 },
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'increment',
            key: 'friendsCount',
          }),
        );

        expect(newState.details?.friendsCount).toBe(6);
      });

      it('does nothing when status is not SUCCESS', () => {
        const state: UserState = {
          status: 'LOADING',
          details: null,
        };

        const newState = userReducer(
          state,
          userActions.updateUserResourceCount({
            type: 'increment',
            key: 'postCount',
          }),
        );

        expect(newState.details).toBeNull();
      });
    });

    describe('editUser', () => {
      it('updates user details partially', () => {
        const state: UserSuccessState = {
          status: 'SUCCESS',
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
        const state: UserState = {
          status: 'LOADING',
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

  it('startLoading clears existing user details', () => {
    const state: UserSuccessState = { status: 'SUCCESS', details: mockUser };

    const newState = userReducer(state, userActions.startLoading());

    expect(newState).toMatchObject({ status: 'LOADING', details: null });
  });

  it('loadFailed sets the failed state', () => {
    const state: UserState = { status: 'LOADING', details: null };

    const newState = userReducer(state, userActions.loadFailed('Fetch failed'));

    expect(newState).toMatchObject({
      status: 'FAILED',
      details: null,
      error: 'Fetch failed',
    });
  });
});
