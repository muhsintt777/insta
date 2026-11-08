import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders } from 'test';
import { ToastHost } from '../toast-host';

describe('ToastHost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders an active toast message', () => {
    renderWithProviders(<ToastHost />, {
      preloadedState: {
        toast: {
          show: true,
          message: 'Test message',
          severity: 'success',
        },
      },
    });

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('does not render an inactive toast message', () => {
    renderWithProviders(<ToastHost />, {
      preloadedState: {
        toast: {
          show: false,
          message: 'Test message',
          severity: 'success',
        },
      },
    });

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it.each(['error', 'success', 'warning', 'info'] as const)(
    'renders the %s severity',
    (severity) => {
      renderWithProviders(<ToastHost />, {
        preloadedState: {
          toast: {
            show: true,
            message: `${severity} message`,
            severity,
          },
        },
      });

      expect(screen.getByRole('alert')).toHaveClass(
        `MuiAlert-standard${severity[0].toUpperCase()}${severity.slice(1)}`,
      );
    },
  );
});
