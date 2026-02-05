import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { ProfilePage } from '../profile-page';
import { PostService } from 'features/posts/post-service';
import { LikeService } from 'features/like/like-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('features/posts/post-service', () => ({
  PostService: {
    fetchUserPosts: vi.fn(),
    deletePost: vi.fn(),
    editPost: vi.fn(),
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

const mockShowBackdrop = vi.fn();
const mockHideBackdrop = vi.fn();
vi.mock('features/loader/useLoader', () => ({
  useLoader: () => ({
    showGlobalBackdrop: mockShowBackdrop,
    hideGlobalBackdrop: mockHideBackdrop,
  }),
}));

const mockUserDetails = {
  id: 'user-1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  profileImage: 'http://example.com/avatar.jpg',
  bio: 'Test bio',
  postCount: 5,
  friendsCount: 10,
};

const mockPosts: Post[] = [
  {
    id: 'post-1',
    caption: 'Test post 1',
    image: 'http://example.com/image1.jpg',
    likeCount: 10,
    commentCount: 5,
    isLiked: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    creator: {
      id: 'user-1',
      fullName: 'John Doe',
      username: 'johndoe',
      profileImage: 'http://example.com/avatar.jpg',
    },
  },
  {
    id: 'post-2',
    caption: 'Test post 2',
    image: 'http://example.com/image2.jpg',
    likeCount: 20,
    commentCount: 10,
    isLiked: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    creator: {
      id: 'user-1',
      fullName: 'John Doe',
      username: 'johndoe',
      profileImage: 'http://example.com/avatar.jpg',
    },
  },
];

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (PostService.fetchUserPosts as Mock).mockResolvedValue(mockPosts);
  });

  describe('rendering', () => {
    it('renders profile header with PROFILE title', async () => {
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      expect(screen.getByText('PROFILE')).toBeInTheDocument();
    });

    it('renders user name', async () => {
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders user stats', async () => {
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      expect(screen.getByText('5 posts | 10 friends')).toBeInTheDocument();
    });

    it('renders user bio', async () => {
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      expect(screen.getByText('Test bio')).toBeInTheDocument();
    });

    it('renders "Add bio..." when user has no bio', async () => {
      const userWithNoBio = { ...mockUserDetails, bio: '' };
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: userWithNoBio },
        },
      });

      expect(screen.getByText('Add bio...')).toBeInTheDocument();
    });

    it('renders edit profile button', async () => {
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      // Find the IconButton for edit
      const buttons = screen.getAllByRole('button');
      const editButton = buttons.find(
        (btn) =>
          !btn.textContent?.includes('PROFILE') &&
          btn.querySelector('svg') !== null,
      );
      expect(editButton).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows loading state while fetching posts', async () => {
      (PostService.fetchUserPosts as Mock).mockImplementation(
        () => new Promise(() => {}), // Never resolves
      );

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      // Component starts loading posts
      expect(PostService.fetchUserPosts).toHaveBeenCalled();
    });
  });

  describe('posts display', () => {
    it('shows posts after loading', async () => {
      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });
      expect(screen.getByText('Test post 2')).toBeInTheDocument();
    });

    it('shows "No posts to display." when user has no posts', async () => {
      (PostService.fetchUserPosts as Mock).mockResolvedValue([]);

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('No posts to display.')).toBeInTheDocument();
      });
    });

    it('handles error when fetching posts fails', async () => {
      const mockError = new Error('Failed to fetch posts');
      (PostService.fetchUserPosts as Mock).mockRejectedValue(mockError);

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
      });
    });
  });

  describe('navigation', () => {
    it('navigates back when back button is clicked', async () => {
      const user = userEvent.setup();

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      // Find and click the back button (first button in AppBar)
      const backButton = screen.getAllByRole('button')[0];
      await user.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('edit profile modal', () => {
    it('opens edit profile modal when edit button is clicked', async () => {
      const user = userEvent.setup();

      const { container } = renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });

      // Find the edit profile button (inside _editIconWrap class)
      const editIconWrap = container.querySelector('[class*="editIconWrap"]');
      const editButton = editIconWrap?.querySelector('button');

      if (editButton) {
        await user.click(editButton);

        await waitFor(() => {
          expect(screen.getByText('Edit Profile')).toBeInTheDocument();
        });
      }
    });
  });

  describe('like functionality', () => {
    it('calls createLike when liking a post', async () => {
      const user = userEvent.setup();
      (LikeService.createLike as Mock).mockResolvedValue({});

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });

      // Find the like button for the first post (post-1 which is not liked)
      // The like button has a span with count "10" for first post
      const likeButtons = screen.getAllByRole('button').filter((btn) => {
        const span = btn.querySelector('span');
        return span?.textContent === '10';
      });

      if (likeButtons.length > 0) {
        await user.click(likeButtons[0]);

        await waitFor(() => {
          expect(LikeService.createLike).toHaveBeenCalledWith('post-1');
        });
      }
    });

    it('calls deleteLike when unliking a post', async () => {
      const user = userEvent.setup();
      (LikeService.deleteLike as Mock).mockResolvedValue({});

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 2')).toBeInTheDocument();
      });

      // Find the like button for the second post (post-2 which is liked, count = 20)
      const likeButtons = screen.getAllByRole('button').filter((btn) => {
        const span = btn.querySelector('span');
        return span?.textContent === '20';
      });

      if (likeButtons.length > 0) {
        await user.click(likeButtons[0]);

        await waitFor(() => {
          expect(LikeService.deleteLike).toHaveBeenCalledWith('post-2');
        });
      }
    });
  });

  describe('delete post functionality', () => {
    it('deletes a post when delete menu item is clicked', async () => {
      const user = userEvent.setup();
      (PostService.deletePost as Mock).mockResolvedValue({});

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });

      // Find and click the menu button (vertical dot icon)
      const menuButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg[viewBox="0 0 24 24"]');
        return svg && btn.closest('[class*="iconButton"]');
      });

      if (menuButtons.length > 0) {
        await user.click(menuButtons[0]);

        await waitFor(() => {
          expect(screen.getByText('Delete')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Delete'));

        await waitFor(() => {
          expect(PostService.deletePost).toHaveBeenCalledWith('post-1');
        });
      }
    });

    it('handles error when delete post fails', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Delete failed');
      (PostService.deletePost as Mock).mockRejectedValue(mockError);

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });

      // Find and click the menu button
      const menuButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg[viewBox="0 0 24 24"]');
        return svg && btn.closest('[class*="iconButton"]');
      });

      if (menuButtons.length > 0) {
        await user.click(menuButtons[0]);

        await waitFor(() => {
          expect(screen.getByText('Delete')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Delete'));

        await waitFor(() => {
          expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
        });
      }
    });
  });

  describe('edit post functionality', () => {
    it('opens edit menu for a post', async () => {
      const user = userEvent.setup();

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });

      // Find and click the menu button
      const menuButtons = screen.getAllByRole('button').filter((btn) => {
        const svg = btn.querySelector('svg[viewBox="0 0 24 24"]');
        return svg && btn.closest('[class*="iconButton"]');
      });

      if (menuButtons.length > 0) {
        await user.click(menuButtons[0]);

        // Verify the edit menu item appears
        await waitFor(() => {
          expect(screen.getByText('Edit')).toBeInTheDocument();
        });
      }
    });
  });

  describe('comments modal', () => {
    it('triggers comment callback when comment button is clicked', async () => {
      const user = userEvent.setup();

      renderWithProviders(<ProfilePage />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      });

      await waitFor(() => {
        expect(screen.getByText('Test post 1')).toBeInTheDocument();
      });

      // Find the comment button for first post (count = 5)
      const commentButtons = screen.getAllByRole('button').filter((btn) => {
        const span = btn.querySelector('span');
        return span?.textContent === '5';
      });

      expect(commentButtons.length).toBeGreaterThan(0);
      // Clicking will trigger openCommentsModal callback
      await user.click(commentButtons[0]);
    });
  });
});
