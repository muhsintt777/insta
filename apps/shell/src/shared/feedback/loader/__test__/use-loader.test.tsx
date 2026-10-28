import { createElement, PropsWithChildren } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { act, renderHook } from 'test';
import { loaderReducer } from '../loader-slice';
import { useLoader } from '../use-loader';

const renderLoaderHook = () => {
  const store = configureStore({ reducer: { loader: loaderReducer } });
  const wrapper = ({ children }: PropsWithChildren) =>
    createElement(Provider, { store, children });
  const hook = renderHook(() => useLoader(), { wrapper });

  return { ...hook, store };
};

describe('useLoader', () => {
  it('returns false when the backdrop is initially hidden', () => {
    const { result } = renderLoaderHook();
    expect(result.current.isBackdropVisible).toBe(false);
  });

  it('shows and hides the global backdrop', () => {
    const { result, store } = renderLoaderHook();

    act(() => result.current.showGlobalBackdrop());
    expect(store.getState().loader.showBackdrop).toBe(true);

    act(() => result.current.hideGlobalBackdrop());
    expect(store.getState().loader.showBackdrop).toBe(false);
  });

  it('returns stable action function references', () => {
    const { result, rerender } = renderLoaderHook();
    const show = result.current.showGlobalBackdrop;
    const hide = result.current.hideGlobalBackdrop;

    rerender();

    expect(result.current.showGlobalBackdrop).toBe(show);
    expect(result.current.hideGlobalBackdrop).toBe(hide);
  });
});
