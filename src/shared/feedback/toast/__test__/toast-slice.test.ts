import { describe, it, expect } from 'vitest';
import { toastReducer, toastActions } from '../toast-slice';

describe('toastSlice', () => {
  const initialState = {
    show: false,
    severity: 'info' as const,
    message: '',
  };

  it.each(['success', 'error', 'warning', 'info'] as const)(
    'shows a %s toast',
    (severity) => {
      const state = toastReducer(
        initialState,
        toastActions.showToast({ severity, message: `${severity} message` }),
      );

      expect(state).toEqual({
        show: true,
        severity,
        message: `${severity} message`,
      });
    },
  );

  it('overwrites the previous toast', () => {
    const previousState = {
      show: true,
      severity: 'success' as const,
      message: 'Previous message',
    };
    const state = toastReducer(
      previousState,
      toastActions.showToast({ severity: 'error', message: 'New message' }),
    );

    expect(state).toEqual({
      show: true,
      severity: 'error',
      message: 'New message',
    });
  });

  it('hides the toast and retains its content', () => {
    const visibleState = {
      show: true,
      severity: 'error' as const,
      message: 'Error message',
    };
    const state = toastReducer(visibleState, toastActions.hideToast());

    expect(state).toEqual({ ...visibleState, show: false });
  });

  it('returns the initial state for an unknown action', () => {
    expect(toastReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
