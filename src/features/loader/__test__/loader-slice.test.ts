import { describe, it, expect } from 'vitest';
import { loaderReducer, loaderActions } from '../loader-slice';

describe('loaderSlice', () => {
  const initialState = { showBackdrop: false };

  describe('showBackdrop', () => {
    it('sets showBackdrop to true', () => {
      const state = loaderReducer(initialState, loaderActions.showBackdrop());

      expect(state.showBackdrop).toBe(true);
    });

    it('keeps showBackdrop true when already true', () => {
      const activeState = { showBackdrop: true };
      const state = loaderReducer(activeState, loaderActions.showBackdrop());

      expect(state.showBackdrop).toBe(true);
    });
  });

  describe('hideBackdrop', () => {
    it('sets showBackdrop to false', () => {
      const activeState = { showBackdrop: true };
      const state = loaderReducer(activeState, loaderActions.hideBackdrop());

      expect(state.showBackdrop).toBe(false);
    });

    it('keeps showBackdrop false when already false', () => {
      const state = loaderReducer(initialState, loaderActions.hideBackdrop());

      expect(state.showBackdrop).toBe(false);
    });
  });

  describe('initial state', () => {
    it('returns initial state for unknown action', () => {
      const state = loaderReducer(undefined, { type: 'unknown' });

      expect(state).toEqual(initialState);
    });
  });
});
