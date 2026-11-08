import { describe, it, expect } from 'vitest';
import { loaderReducer, loaderActions } from '../loader-slice';

describe('loaderSlice', () => {
  const initialState = { showBackdrop: false };

  it('shows the backdrop', () => {
    expect(loaderReducer(initialState, loaderActions.showBackdrop()).showBackdrop)
      .toBe(true);
  });

  it('keeps the backdrop visible when shown repeatedly', () => {
    const activeState = { showBackdrop: true };
    expect(loaderReducer(activeState, loaderActions.showBackdrop()).showBackdrop)
      .toBe(true);
  });

  it('hides the backdrop', () => {
    expect(
      loaderReducer({ showBackdrop: true }, loaderActions.hideBackdrop())
        .showBackdrop,
    ).toBe(false);
  });

  it('returns the initial state for an unknown action', () => {
    expect(loaderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});