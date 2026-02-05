import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoader } from '../useLoader';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { loaderActions } from '../loader-slice';

vi.mock('hooks/redux-hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('useLoader', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
  });

  it('returns isBackdropVisible as true when showBackdrop is true', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      showBackdrop: true,
    });

    const { result } = renderHook(() => useLoader());

    expect(result.current.isBackdropVisible).toBe(true);
  });

  it('returns isBackdropVisible as false when showBackdrop is false', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      showBackdrop: false,
    });

    const { result } = renderHook(() => useLoader());

    expect(result.current.isBackdropVisible).toBe(false);
  });

  it('dispatches showBackdrop action when showGlobalBackdrop is called', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      showBackdrop: false,
    });

    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.showGlobalBackdrop();
    });

    expect(mockDispatch).toHaveBeenCalledWith(loaderActions.showBackdrop());
  });

  it('dispatches hideBackdrop action when hideGlobalBackdrop is called', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      showBackdrop: true,
    });

    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.hideGlobalBackdrop();
    });

    expect(mockDispatch).toHaveBeenCalledWith(loaderActions.hideBackdrop());
  });

  it('returns stable function references', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      showBackdrop: false,
    });

    const { result, rerender } = renderHook(() => useLoader());
    const firstShowGlobalBackdrop = result.current.showGlobalBackdrop;
    const firstHideGlobalBackdrop = result.current.hideGlobalBackdrop;

    rerender();

    expect(result.current.showGlobalBackdrop).toBe(firstShowGlobalBackdrop);
    expect(result.current.hideGlobalBackdrop).toBe(firstHideGlobalBackdrop);
  });
});
