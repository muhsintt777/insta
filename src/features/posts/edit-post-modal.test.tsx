import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { EditPostModal } from './edit-post-modal';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('features/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

describe('EditPostModal', () => {
  const defaultProps = {
    isOpen: true,
    closeModal: vi.fn(),
    onSubmit: vi.fn(),
    postId: 'post-123',
    currentCaption: 'Current caption',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with title', () => {
    renderWithProviders(<EditPostModal {...defaultProps} />);

    expect(screen.getByText('EDIT POST')).toBeInTheDocument();
  });

  it('renders caption input field', () => {
    renderWithProviders(<EditPostModal {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("What's on your mind?"),
    ).toBeInTheDocument();
  });

  it('pre-fills caption with currentCaption', async () => {
    renderWithProviders(<EditPostModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("What's on your mind?")).toHaveValue(
        'Current caption',
      );
    });
  });

  it('renders UPDATE button', () => {
    renderWithProviders(<EditPostModal {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'UPDATE' })).toBeInTheDocument();
  });

  it('renders CANCEL button', () => {
    renderWithProviders(<EditPostModal {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('calls closeModal when CANCEL is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <EditPostModal {...defaultProps} closeModal={closeModal} />,
    );

    await user.click(screen.getByRole('button', { name: 'CANCEL' }));

    expect(closeModal).toHaveBeenCalled();
  });

  it('calls closeModal when close icon is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <EditPostModal {...defaultProps} closeModal={closeModal} />,
    );

    // Find the close button (it's the IconButton, not UPDATE or CANCEL text buttons)
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find(
      (btn) =>
        !btn.textContent?.includes('UPDATE') &&
        !btn.textContent?.includes('CANCEL'),
    );
    await user.click(closeButton!);

    expect(closeModal).toHaveBeenCalled();
  });

  it('calls onSubmit with updated caption', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const closeModal = vi.fn();

    renderWithProviders(
      <EditPostModal
        {...defaultProps}
        onSubmit={onSubmit}
        closeModal={closeModal}
      />,
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("What's on your mind?")).toHaveValue(
        'Current caption',
      );
    });

    const captionInput = screen.getByPlaceholderText("What's on your mind?");
    await user.clear(captionInput);
    await user.type(captionInput, 'Updated caption');

    await user.click(screen.getByRole('button', { name: 'UPDATE' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        postId: 'post-123',
        caption: 'Updated caption',
      });
    });

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
    });
  });

  it('handles error when onSubmit fails', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Update failed');
    const onSubmit = vi.fn().mockRejectedValue(mockError);

    renderWithProviders(
      <EditPostModal {...defaultProps} onSubmit={onSubmit} />,
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("What's on your mind?")).toHaveValue(
        'Current caption',
      );
    });

    await user.click(screen.getByRole('button', { name: 'UPDATE' }));

    await waitFor(() => {
      expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
    });
  });

  it('shows validation error for empty caption', async () => {
    const user = userEvent.setup();

    renderWithProviders(<EditPostModal {...defaultProps} />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("What's on your mind?")).toHaveValue(
        'Current caption',
      );
    });

    const captionInput = screen.getByPlaceholderText("What's on your mind?");
    await user.clear(captionInput);

    await user.click(screen.getByRole('button', { name: 'UPDATE' }));

    await waitFor(() => {
      expect(screen.getByText('Caption is too small')).toBeInTheDocument();
    });
  });

  it('does not render when isOpen is false', () => {
    renderWithProviders(<EditPostModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('EDIT POST')).not.toBeInTheDocument();
  });

  it('resets form when modal is opened with new caption', async () => {
    const { rerender } = renderWithProviders(
      <EditPostModal {...defaultProps} currentCaption="First caption" />,
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("What's on your mind?")).toHaveValue(
        'First caption',
      );
    });

    rerender(
      <EditPostModal {...defaultProps} currentCaption="Second caption" />,
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("What's on your mind?")).toHaveValue(
        'Second caption',
      );
    });
  });
});
