import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';
import { useAppDispatch } from 'hooks/redux-hooks';
import { toastActions } from './toast-slice';

vi.mock('hooks/redux-hooks', () => ({
  useAppDispatch: vi.fn(),
}));

describe('useToast', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as ReturnType<typeof vi.fn>).mockReturnValue(mockDispatch);
  });

  it('dispatches show action with success severity', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('success', 'Success message');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'success', message: 'Success message' }),
    );
  });

  it('dispatches show action with error severity', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('error', 'Error message');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'error', message: 'Error message' }),
    );
  });

  it('dispatches show action with warning severity', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('warning', 'Warning message');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'warning', message: 'Warning message' }),
    );
  });

  it('dispatches show action with info severity', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.showToast('info', 'Info message');
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      toastActions.show({ severity: 'info', message: 'Info message' }),
    );
  });

  it('returns stable showToast function reference', () => {
    const { result, rerender } = renderHook(() => useToast());
    const firstShowToast = result.current.showToast;

    rerender();

    expect(result.current.showToast).toBe(firstShowToast);
  });
});
