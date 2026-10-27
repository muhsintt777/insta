import { createElement, PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { toastReducer } from '../toast-slice';
import { useToast } from '../use-toast';

const renderToastHook = () => {
  const store = configureStore({ reducer: { toast: toastReducer } });
  const wrapper = ({ children }: PropsWithChildren) =>
    createElement(Provider, { store, children });
  const hook = renderHook(() => useToast(), { wrapper });

  return { ...hook, store };
};

describe('useToast', () => {
  it.each(['success', 'error', 'warning', 'info'] as const)(
    'dispatches a %s toast',
    (severity) => {
      const { result, store } = renderToastHook();

      act(() => {
        result.current.showToast(severity, `${severity} message`);
      });

      expect(store.getState().toast).toEqual({
        show: true,
        severity,
        message: `${severity} message`,
      });
    },
  );

  it('returns a stable showToast function reference', () => {
    const { result, rerender } = renderToastHook();
    const firstShowToast = result.current.showToast;

    rerender();

    expect(result.current.showToast).toBe(firstShowToast);
  });
});
