import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { Toast } from './toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders toast when show is true', () => {
    renderWithProviders(<Toast />, {
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

  it('does not render toast message when show is false', () => {
    renderWithProviders(<Toast />, {
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

  it('renders with error severity', () => {
    renderWithProviders(<Toast />, {
      preloadedState: {
        toast: {
          show: true,
          message: 'Error message',
          severity: 'error',
        },
      },
    });

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardError');
  });

  it('renders with success severity', () => {
    renderWithProviders(<Toast />, {
      preloadedState: {
        toast: {
          show: true,
          message: 'Success message',
          severity: 'success',
        },
      },
    });

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardSuccess');
  });

  it('renders with warning severity', () => {
    renderWithProviders(<Toast />, {
      preloadedState: {
        toast: {
          show: true,
          message: 'Warning message',
          severity: 'warning',
        },
      },
    });

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardWarning');
  });

  it('renders with info severity', () => {
    renderWithProviders(<Toast />, {
      preloadedState: {
        toast: {
          show: true,
          message: 'Info message',
          severity: 'info',
        },
      },
    });

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardInfo');
  });
});
