import { describe, it, expect } from 'vitest';
import { authReducer, authActions } from '../auth-slice';

describe('authSlice', () => {
  const initialState = { token: null, status: 'LOADING' as const };

  describe('setToken', () => {
    it('sets the token', () => {
      const token = 'Bearer abc123';
      const state = authReducer(initialState, authActions.setToken(token));

      expect(state.token).toBe(token);
    });

    it('overwrites existing token', () => {
      const existingState = {
        token: 'Bearer old-token',
        status: 'AUTHENTICATED' as const,
      };
      const newToken = 'Bearer new-token';
      const state = authReducer(existingState, authActions.setToken(newToken));

      expect(state.token).toBe(newToken);
    });
  });

  describe('clearToken', () => {
    it('clears the token', () => {
      const existingState = {
        token: 'Bearer abc123',
        status: 'AUTHENTICATED' as const,
      };
      const state = authReducer(existingState, authActions.clearToken());

      expect(state.token).toBeNull();
    });

    it('handles clearing when token is already null', () => {
      const state = authReducer(initialState, authActions.clearToken());

      expect(state.token).toBeNull();
    });
  });

  describe('session status', () => {
    it('marks a session as authenticated', () => {
      const state = authReducer(
        initialState,
        authActions.sessionAuthenticated(),
      );

      expect(state.status).toBe('AUTHENTICATED');
    });

    it('marks a failed session and clears its token', () => {
      const state = authReducer(
        { token: 'Bearer abc123', status: 'LOADING' as const },
        authActions.sessionFailed(),
      );

      expect(state).toEqual({ token: null, status: 'FAILED' });
    });

    it('marks a signed-out session and clears its token', () => {
      const state = authReducer(
        { token: 'Bearer abc123', status: 'AUTHENTICATED' as const },
        authActions.sessionUnauthenticated(),
      );

      expect(state).toEqual({ token: null, status: 'UNAUTHENTICATED' });
    });
  });

  describe('initial state', () => {
    it('returns initial state for unknown action', () => {
      const state = authReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
    });
  });
});
