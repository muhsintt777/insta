import { describe, expect, it, vi } from 'vitest';
import { render, screen } from 'test';
import { ToastNotification } from './toast-notification';

describe('ToastNotification', () => {
  it('renders an active toast message', () => {
    render(
      <ToastNotification
        open
        message="Saved successfully"
        severity="success"
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Saved successfully');
  });

  it('does not render an inactive toast message', () => {
    render(
      <ToastNotification
        open={false}
        message="Hidden message"
        severity="info"
        onClose={vi.fn()}
      />,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it.each(['error', 'success', 'warning', 'info'] as const)(
    'renders the %s severity',
    (severity) => {
      render(
        <ToastNotification
          open
          message={`${severity} message`}
          severity={severity}
          onClose={vi.fn()}
        />,
      );

      expect(screen.getByRole('alert')).toHaveClass(
        `MuiAlert-standard${severity[0].toUpperCase()}${severity.slice(1)}`,
      );
    },
  );
});