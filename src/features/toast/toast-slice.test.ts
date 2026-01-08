import { describe, it, expect } from 'vitest';
import { toastReducer, toastActions } from './toast-slice';

describe('toastSlice', () => {
  const initialState = {
    show: false,
    severity: 'info' as const,
    message: '',
  };

  describe('show', () => {
    it('shows toast with success severity', () => {
      const state = toastReducer(
        initialState,
        toastActions.show({ severity: 'success', message: 'Success message' }),
      );

      expect(state.show).toBe(true);
      expect(state.severity).toBe('success');
      expect(state.message).toBe('Success message');
    });

    it('shows toast with error severity', () => {
      const state = toastReducer(
        initialState,
        toastActions.show({ severity: 'error', message: 'Error occurred' }),
      );

      expect(state.show).toBe(true);
      expect(state.severity).toBe('error');
      expect(state.message).toBe('Error occurred');
    });

    it('shows toast with warning severity', () => {
      const state = toastReducer(
        initialState,
        toastActions.show({ severity: 'warning', message: 'Warning message' }),
      );

      expect(state.severity).toBe('warning');
    });

    it('shows toast with info severity', () => {
      const state = toastReducer(
        initialState,
        toastActions.show({ severity: 'info', message: 'Info message' }),
      );

      expect(state.severity).toBe('info');
    });

    it('overwrites previous toast', () => {
      const previousState = {
        show: true,
        severity: 'success' as const,
        message: 'Previous message',
      };
      const state = toastReducer(
        previousState,
        toastActions.show({ severity: 'error', message: 'New message' }),
      );

      expect(state.severity).toBe('error');
      expect(state.message).toBe('New message');
    });
  });

  describe('hide', () => {
    it('hides the toast', () => {
      const visibleState = {
        show: true,
        severity: 'success' as const,
        message: 'Some message',
      };
      const state = toastReducer(visibleState, toastActions.hide());

      expect(state.show).toBe(false);
    });

    it('preserves message and severity when hiding', () => {
      const visibleState = {
        show: true,
        severity: 'error' as const,
        message: 'Error message',
      };
      const state = toastReducer(visibleState, toastActions.hide());

      expect(state.show).toBe(false);
      expect(state.severity).toBe('error');
      expect(state.message).toBe('Error message');
    });
  });

  describe('initial state', () => {
    it('returns initial state for unknown action', () => {
      const state = toastReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
    });
  });
});
