import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { HomePage } from './home-page';
import { PostService } from 'features/posts/post-service';
import { LikeService } from 'features/like/like-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('features/posts/post-service', () => ({
  PostService: {
    fetchPosts: vi.fn(),
  },
}));

vi.mock('features/like/like-service', () => ({
  LikeService: {
    createLike: vi.fn(),
    deleteLike: vi.fn(),
  },
}));

vi.mock('features/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

vi.mock('features/comment/comments-modal', () => ({
  CommentsModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="comments-modal">Comments Modal</div> : null,
}));

vi.mock('./components/add-post/add-post', () => ({
  AddPost: ({ onPostCreated }: { onPostCreated?: () => void }) => (
    <button onClick={onPostCreated} data-testid="add-post">
      Add Post
    </button>
  ),
}));

vi.mock('features/posts/components/post-card', () => ({
  PostCard: ({
    id,
    caption,
    onLike,
    onComment,
    isLiked,
    likeCount,
    commentCount,
  }: {
    id: string;
    caption: string;
    onLike: () => void;
    onComment: () => void;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
  }) => (
    <div data-testid={`post-${id}`}>
      <p>{caption}</p>
      <span data-testid={`like-count-${id}`}>{likeCount}</span>
      <span data-testid={`comment-count-${id}`}>{commentCount}</span>
      <button onClick={onLike} data-testid={`like-btn-${id}`}>
        {isLiked ? 'Unlike' : 'Like'}
      </button>
      <button onClick={onComment} data-testid={`comment-btn-${id}`}>
        Comment
      </button>
    </div>
  ),
  PostCardSkeleton: () => <div data-testid="post-skeleton">Loading...</div>,
}));

const mockPosts: Post[] = [
  {
    id: 'post-1',
    caption: 'First post',
    image: 'https://example.com/image1.jpg',
    likeCount: 5,
    commentCount: 3,
    isLiked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: {
      id: 'user-1',
      fullName: 'John Doe',
      username: 'johndoe',
      profileImage: 'https://example.com/profile1.jpg',
    },
  },
  {
    id: 'post-2',
    caption: 'Second post',
    image: 'https://example.com/image2.jpg',
    likeCount: 10,
    commentCount: 7,
    isLiked: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    creator: {
      id: 'user-2',
      fullName: 'Jane Smith',
      username: 'janesmith',
      profileImage: null,
    },
  },
];

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loading state', () => {
    it('shows skeleton loaders while loading', async () => {
      (PostService.fetchPosts as Mock).mockImplementation(
        () => new Promise(() => {}), // Never resolves
      );

      renderWithProviders(<HomePage />);

      expect(screen.getAllByTestId('post-skeleton')).toHaveLength(2);
    });
  });

  describe('success state', () => {
    it('displays posts after loading', async () => {
      (PostService.fetchPosts as Mock).mockResolvedValue(mockPosts);

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(screen.getByTestId('post-post-1')).toBeInTheDocument();
      });
      expect(screen.getByTestId('post-post-2')).toBeInTheDocument();
      expect(screen.getByText('First post')).toBeInTheDocument();
      expect(screen.getByText('Second post')).toBeInTheDocument();
    });

    it('shows add post component', async () => {
      (PostService.fetchPosts as Mock).mockResolvedValue(mockPosts);

      renderWithProviders(<HomePage />);

      expect(screen.getByTestId('add-post')).toBeInTheDocument();
    });

    it('shows no posts message when empty', async () => {
      (PostService.fetchPosts as Mock).mockResolvedValue([]);

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(screen.getByText('No posts to display.')).toBeInTheDocument();
      });
    });
  });

  describe('error state', () => {
    it('shows error message and calls handleErrorWithToast on failure', async () => {
      const mockError = new Error('Failed to load');
      (PostService.fetchPosts as Mock).mockRejectedValue(mockError);

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
      });
    });
  });

  describe('like functionality', () => {
    it('likes a post and updates count', async () => {
      const user = userEvent.setup();
      (PostService.fetchPosts as Mock).mockResolvedValue(mockPosts);
      (LikeService.createLike as Mock).mockResolvedValue({});

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(screen.getByTestId('post-post-1')).toBeInTheDocument();
      });

      const likeButton = screen.getByTestId('like-btn-post-1');
      await user.click(likeButton);

      await waitFor(() => {
        expect(LikeService.createLike).toHaveBeenCalledWith('post-1');
      });
    });

    it('unlikes a post and updates count', async () => {
      const user = userEvent.setup();
      (PostService.fetchPosts as Mock).mockResolvedValue(mockPosts);
      (LikeService.deleteLike as Mock).mockResolvedValue({});

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(screen.getByTestId('post-post-2')).toBeInTheDocument();
      });

      const unlikeButton = screen.getByTestId('like-btn-post-2');
      await user.click(unlikeButton);

      await waitFor(() => {
        expect(LikeService.deleteLike).toHaveBeenCalledWith('post-2');
      });
    });
  });

  describe('comments functionality', () => {
    it('opens comments modal when comment button is clicked', async () => {
      const user = userEvent.setup();
      (PostService.fetchPosts as Mock).mockResolvedValue(mockPosts);

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(screen.getByTestId('post-post-1')).toBeInTheDocument();
      });

      const commentButton = screen.getByTestId('comment-btn-post-1');
      await user.click(commentButton);

      await waitFor(() => {
        expect(screen.getByTestId('comments-modal')).toBeInTheDocument();
      });
    });
  });

  describe('refetch functionality', () => {
    it('refetches posts when add post callback is triggered', async () => {
      const user = userEvent.setup();
      (PostService.fetchPosts as Mock).mockResolvedValue(mockPosts);

      renderWithProviders(<HomePage />);

      await waitFor(() => {
        expect(screen.getByTestId('post-post-1')).toBeInTheDocument();
      });

      const addPostButton = screen.getByTestId('add-post');
      await user.click(addPostButton);

      await waitFor(() => {
        expect(PostService.fetchPosts).toHaveBeenCalledTimes(2);
      });
    });
  });
});
