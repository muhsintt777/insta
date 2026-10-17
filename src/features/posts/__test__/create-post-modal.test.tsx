import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { CreatePostModal } from '../create-post-modal';
import { PostService } from '../post-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('../post-service', () => ({
  PostService: {
    createPost: vi.fn(),
  },
}));

vi.mock('features/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

describe('CreatePostModal', () => {
  const defaultProps = {
    isOpen: true,
    closeModal: vi.fn(),
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with title', () => {
    renderWithProviders(<CreatePostModal {...defaultProps} />);

    expect(screen.getByText('CREATE POST')).toBeInTheDocument();
  });

  it('renders caption input field', () => {
    renderWithProviders(<CreatePostModal {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("What's on your mind?"),
    ).toBeInTheDocument();
  });

  it('renders image input field', () => {
    renderWithProviders(<CreatePostModal {...defaultProps} />);

    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('renders POST button', () => {
    renderWithProviders(<CreatePostModal {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'POST' })).toBeInTheDocument();
  });

  it('renders CANCEL button', () => {
    renderWithProviders(<CreatePostModal {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('calls closeModal when CANCEL is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <CreatePostModal {...defaultProps} closeModal={closeModal} />,
    );

    await user.click(screen.getByRole('button', { name: 'CANCEL' }));

    expect(closeModal).toHaveBeenCalled();
  });

  it('calls closeModal when close icon is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <CreatePostModal {...defaultProps} closeModal={closeModal} />,
    );

    // Find the close button (it's the IconButton, not POST or CANCEL text buttons)
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find(
      (btn) =>
        !btn.textContent?.includes('POST') &&
        !btn.textContent?.includes('CANCEL'),
    );
    await user.click(closeButton!);

    expect(closeModal).toHaveBeenCalled();
  });

  it('shows validation error when submitting empty form', async () => {
    const user = userEvent.setup();

    renderWithProviders(<CreatePostModal {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: 'POST' }));

    await waitFor(() => {
      expect(screen.getByText('Required')).toBeInTheDocument();
    });
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();
    const onSubmit = vi.fn();
    (PostService.createPost as Mock).mockResolvedValue({});

    renderWithProviders(
      <CreatePostModal
        isOpen={true}
        closeModal={closeModal}
        onSubmit={onSubmit}
      />,
    );

    await user.type(
      screen.getByPlaceholderText("What's on your mind?"),
      'Test caption',
    );

    // Create and upload a mock file
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = document.querySelector('input[type="file"]') as HTMLElement;
    await user.upload(input, file);

    await user.click(screen.getByRole('button', { name: 'POST' }));

    await waitFor(() => {
      expect(PostService.createPost).toHaveBeenCalled();
    });
  });

  it('handles error when createPost fails', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Create failed');
    (PostService.createPost as Mock).mockRejectedValue(mockError);

    renderWithProviders(<CreatePostModal {...defaultProps} />);

    await user.type(
      screen.getByPlaceholderText("What's on your mind?"),
      'Test caption',
    );

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = document.querySelector('input[type="file"]') as HTMLElement;
    await user.upload(input, file);

    await user.click(screen.getByRole('button', { name: 'POST' }));

    await waitFor(() => {
      expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
    });
  });

  it('does not render when isOpen is false', () => {
    renderWithProviders(<CreatePostModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('CREATE POST')).not.toBeInTheDocument();
  });
});
