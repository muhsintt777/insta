import { describe, it, expect } from 'vitest';
import { userActions, userReducer } from '../user-slice';
import type { User } from '../user-types';

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

  it('sets the profile', () => {
    const state = userReducer(
      { details: null },
      userActions.setProfile(mockUser),
    );
    expect(state.details).toEqual(mockUser);
  });

  it('clears the profile', () => {
    const state = userReducer(
      { details: mockUser },
      userActions.clearProfile(),
    );
    expect(state.details).toBeNull();
  });

  describe('updateUserResourceCount', () => {
    it('increments postCount', () => {
      const state = userReducer(
        { details: mockUser },
        userActions.updateUserResourceCount({
          type: 'increment',
          key: 'postCount',
        }),
      );
      expect(state.details?.postCount).toBe(11);
    });

    it('decrements postCount', () => {
      const state = userReducer(
        { details: mockUser },
        userActions.updateUserResourceCount({
          type: 'decrement',
          key: 'postCount',
        }),
      );
      expect(state.details?.postCount).toBe(9);
    });

    it('does nothing when no profile is loaded', () => {
      const state = userReducer(
        { details: null },
        userActions.updateUserResourceCount({
          type: 'increment',
          key: 'postCount',
        }),
      );
      expect(state.details).toBeNull();
    });
  });

  describe('editUser', () => {
    it('updates user details partially', () => {
      const state = userReducer(
        { details: mockUser },
        userActions.editUser({ fullName: 'Jane Doe', bio: 'New bio' }),
      );
      expect(state.details?.fullName).toBe('Jane Doe');
      expect(state.details?.bio).toBe('New bio');
      expect(state.details?.email).toBe('john@example.com');
    });

    it('does nothing when no profile is loaded', () => {
      const state = userReducer(
        { details: null },
        userActions.editUser({ fullName: 'Jane Doe' }),
      );
      expect(state.details).toBeNull();
    });
  });
});
