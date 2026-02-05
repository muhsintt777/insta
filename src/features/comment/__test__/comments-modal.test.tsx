import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { CommentsModal } from '../comments-modal';
import { CommentService } from '../comment-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('../comment-service', () => ({
  CommentService: {
    listPostComments: vi.fn(),
    createComment: vi.fn(),
    deleteComment: vi.fn(),
  },
}));

vi.mock('features/toast/handle-error-with-toast', () => ({
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

  describe('rendering', () => {
    it('renders modal with title', async () => {
      (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      expect(screen.getByText('COMMENTS')).toBeInTheDocument();
    });

    it('renders comment input and send button', async () => {
      (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Add a comment...'),
        ).toBeInTheDocument();
      });
      expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows loader while fetching comments', async () => {
      (CommentService.listPostComments as Mock).mockImplementation(
        () => new Promise(() => {}), // Never resolves
      );

      renderWithProviders(<CommentsModal {...defaultProps} />);

      // The loader should be visible while loading
      await waitFor(() => {
        expect(CommentService.listPostComments).toHaveBeenCalledWith(
          'post-123',
        );
      });
    });
  });

  describe('success state', () => {
    it('displays comments when loaded successfully', async () => {
      (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Test comment 1')).toBeInTheDocument();
      });
      expect(screen.getByText('Test comment 2')).toBeInTheDocument();
    });

    it('shows no comments message when empty', async () => {
      (CommentService.listPostComments as Mock).mockResolvedValue([]);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('No comments yet')).toBeInTheDocument();
      });
    });
  });

  describe('error state', () => {
    it('shows error message when loading fails', async () => {
      const mockError = new Error('Failed to load');
      (CommentService.listPostComments as Mock).mockRejectedValue(mockError);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      await waitFor(() => {
        expect(screen.getByText('Failed to load comments')).toBeInTheDocument();
      });
      expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
    });
  });

  describe('comment submission', () => {
    it('creates a new comment on submit', async () => {
      const user = userEvent.setup();
      (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
      (CommentService.createComment as Mock).mockResolvedValue({});

      renderWithProviders(<CommentsModal {...defaultProps} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Add a comment...'),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText('Add a comment...');
      await user.type(input, 'New test comment');

      const sendButton = screen.getByRole('button', { name: /send/i });
      await user.click(sendButton);

      await waitFor(() => {
        expect(CommentService.createComment).toHaveBeenCalledWith(
          'post-123',
          'New test comment',
        );
      });

      await waitFor(() => {
        expect(defaultProps.onSubmit).toHaveBeenCalled();
      });
    });

    it('handles comment creation error', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Failed to create');
      (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);
      (CommentService.createComment as Mock).mockRejectedValue(mockError);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      await waitFor(() => {
        expect(
          screen.getByPlaceholderText('Add a comment...'),
        ).toBeInTheDocument();
      });

      const input = screen.getByPlaceholderText('Add a comment...');
      await user.type(input, 'New test comment');

      const sendButton = screen.getByRole('button', { name: /send/i });
      await user.click(sendButton);

      await waitFor(() => {
        expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
      });
    });
  });

  describe('close modal', () => {
    it('calls closeModal when close button is clicked', async () => {
      (CommentService.listPostComments as Mock).mockResolvedValue(mockComments);

      renderWithProviders(<CommentsModal {...defaultProps} />);

      const closeButton = screen.getByRole('button', { name: '' });
      await userEvent.click(closeButton);

      expect(defaultProps.closeModal).toHaveBeenCalled();
    });
  });

  describe('null postId', () => {
    it('does not fetch comments when postId is null', () => {
      renderWithProviders(<CommentsModal {...defaultProps} postId={null} />);

      expect(CommentService.listPostComments).not.toHaveBeenCalled();
    });
  });
});
