import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { AddPost } from './add-post';

vi.mock('features/posts/create-post-modal', () => ({
  CreatePostModal: ({
    isOpen,
    closeModal,
    onSubmit,
  }: {
    isOpen: boolean;
    closeModal: () => void;
    onSubmit?: () => void;
  }) =>
    isOpen ? (
      <div data-testid="create-post-modal">
        <button onClick={closeModal} data-testid="close-modal">
          Close
        </button>
        <button
          onClick={() => {
            onSubmit?.();
            closeModal();
          }}
          data-testid="submit-post"
        >
          Submit
        </button>
      </div>
    ) : null,
}));

const mockUserDetails = {
  id: 'user-1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  profileImage: 'https://example.com/profile.jpg',
};

describe('AddPost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders avatar and clickable box', () => {
    renderWithProviders(<AddPost />, {
      preloadedState: {
        user: {
          details: mockUserDetails,
          status: 'LOGGED_IN',
        },
      },
    });

    expect(screen.getByText("What's on your mind?")).toBeInTheDocument();
  });

  it('opens create post modal when clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(<AddPost />, {
      preloadedState: {
        user: {
          details: mockUserDetails,
          status: 'LOGGED_IN',
        },
      },
    });

    const clickableBox = screen.getByText("What's on your mind?");
    await user.click(clickableBox);

    await waitFor(() => {
      expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();
    });
  });

  it('closes modal when close button is clicked', async () => {
    const user = userEvent.setup();

    renderWithProviders(<AddPost />, {
      preloadedState: {
        user: {
          details: mockUserDetails,
          status: 'LOGGED_IN',
        },
      },
    });

    const clickableBox = screen.getByText("What's on your mind?");
    await user.click(clickableBox);

    await waitFor(() => {
      expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('close-modal');
    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('create-post-modal')).not.toBeInTheDocument();
    });
  });

  it('calls onPostCreated callback when post is submitted', async () => {
    const user = userEvent.setup();
    const mockOnPostCreated = vi.fn();

    renderWithProviders(<AddPost onPostCreated={mockOnPostCreated} />, {
      preloadedState: {
        user: {
          details: mockUserDetails,
          status: 'LOGGED_IN',
        },
      },
    });

    const clickableBox = screen.getByText("What's on your mind?");
    await user.click(clickableBox);

    const submitButton = screen.getByTestId('submit-post');
    await user.click(submitButton);

    expect(mockOnPostCreated).toHaveBeenCalled();
  });

  it('toggles modal on repeated clicks', async () => {
    const user = userEvent.setup();

    renderWithProviders(<AddPost />, {
      preloadedState: {
        user: {
          details: mockUserDetails,
          status: 'LOGGED_IN',
        },
      },
    });

    const clickableBox = screen.getByText("What's on your mind?");

    // First click - open
    await user.click(clickableBox);
    expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();

    // Close modal
    await user.click(screen.getByTestId('close-modal'));
    await waitFor(() => {
      expect(screen.queryByTestId('create-post-modal')).not.toBeInTheDocument();
    });

    // Second click - open again
    await user.click(clickableBox);
    expect(screen.getByTestId('create-post-modal')).toBeInTheDocument();
  });
});
