import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test';
import { CommentsModal } from '../comments-modal';
import { CommentService } from '../comment-service';
import type { CommentDetails } from '../comment-types';
import { handleErrorWithToast } from '@insta/ui/feedback/toast';

vi.mock('../comment-service', () => ({
  CommentService: {
    listPostComments: vi.fn(),
    createComment: vi.fn(),
    deleteComment: vi.fn(),
  },
}));

vi.mock('@insta/ui/feedback/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

const mockComments: CommentDetails[] = [
  {
    id: 'comment-1',
    content: 'Test comment 1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postId: 'post-123',
    creator: {
      id: 'user-1',
      username: 'testuser1',
      profileImage: 'https://example.com/image1.jpg',
    },
  },
  {
    id: 'comment-2',
    content: 'Test comment 2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postId: 'post-123',
    creator: {
      id: 'user-2',
      username: 'testuser2',
      profileImage: null,
    },
  },
];

describe('CommentsModal', () => {
  const defaultProps = {
    isOpen: true,
    closeModal: vi.fn(),
    postId: 'post-123',
    onSubmit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal title', async () => {
    (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
    renderWithProviders(<CommentsModal {...defaultProps} />);
    expect(screen.getByText('COMMENTS')).toBeInTheDocument();
  });

  it('renders input and submit button', async () => {
    (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
    renderWithProviders(<CommentsModal {...defaultProps} />);
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText('Add a comment...'),
      ).toBeInTheDocument(),
    );
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('shows a loader while fetching comments', async () => {
    (CommentService.listPostComments as Mock).mockImplementation(
      () => new Promise(() => {}),
    );
    renderWithProviders(<CommentsModal {...defaultProps} />);
    await waitFor(() =>
      expect(CommentService.listPostComments).toHaveBeenCalledWith('post-123'),
    );
  });

  it('loads and displays comments', async () => {
    (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
    renderWithProviders(<CommentsModal {...defaultProps} />);
    await waitFor(() =>
      expect(screen.getByText('Test comment 1')).toBeInTheDocument(),
    );
    expect(screen.getByText('Test comment 2')).toBeInTheDocument();
  });

  it('shows an empty state when there are no comments', async () => {
    (CommentService.listPostComments as Mock).mockResolvedValue([]);
    renderWithProviders(<CommentsModal {...defaultProps} />);
    await waitFor(() =>
      expect(screen.getByText('No comments yet')).toBeInTheDocument(),
    );
  });

  it('shows and reports a loading failure', async () => {
    const error = new Error('Failed to load');
    (CommentService.listPostComments as Mock).mockRejectedValue(error);
    renderWithProviders(<CommentsModal {...defaultProps} />);
    await waitFor(() =>
      expect(screen.getByText('Failed to load comments')).toBeInTheDocument(),
    );
    expect(handleErrorWithToast).toHaveBeenCalledWith(
      error,
      expect.any(Function),
    );
  });

  it('creates a comment and calls onSubmit', async () => {
    const user = userEvent.setup();
    (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
    (CommentService.createComment as Mock).mockResolvedValue({});
    renderWithProviders(<CommentsModal {...defaultProps} />);

    await user.type(
      await screen.findByPlaceholderText('Add a comment...'),
      'New test comment',
    );
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() =>
      expect(CommentService.createComment).toHaveBeenCalledWith(
        'post-123',
        'New test comment',
      ),
    );
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it('reports a comment creation failure', async () => {
    const user = userEvent.setup();
    const error = new Error('Failed to create');
    (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
    (CommentService.createComment as Mock).mockRejectedValue(error);
    renderWithProviders(<CommentsModal {...defaultProps} />);

    await user.type(
      await screen.findByPlaceholderText('Add a comment...'),
      'New test comment',
    );
    await user.click(screen.getByRole('button', { name: /send/i }));
    await waitFor(() =>
      expect(handleErrorWithToast).toHaveBeenCalledWith(
        error,
        expect.any(Function),
      ),
    );
  });

  it('closes the modal', async () => {
    (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
    renderWithProviders(<CommentsModal {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: '' }));
    expect(defaultProps.closeModal).toHaveBeenCalled();
  });

  it('does not fetch comments without a post id', () => {
    renderWithProviders(<CommentsModal {...defaultProps} postId={null} />);
    expect(CommentService.listPostComments).not.toHaveBeenCalled();
  });
});
