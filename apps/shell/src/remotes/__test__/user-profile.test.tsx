import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test';
import { ProfilePage } from '../user-profile';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../profile-posts', () => ({
  ProfilePosts: () => <div data-testid="profile-posts" />,
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

describe('ProfilePage', () => {
  it('renders the profile header and remote posts surface', () => {
    renderWithProviders(<ProfilePage />, {
      preloadedState: { user: { details: mockUserDetails } },
    });

    expect(screen.getByText('PROFILE')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('5 posts | 10 friends')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
    expect(screen.getByTestId('profile-posts')).toBeInTheDocument();
  });

  it('shows the add-bio prompt when the profile has no bio', () => {
    renderWithProviders(<ProfilePage />, {
      preloadedState: {
        user: { details: { ...mockUserDetails, bio: '' } },
      },
    });

    expect(screen.getByText('Add bio...')).toBeInTheDocument();
  });

  it('navigates back when the back button is clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProfilePage />, {
      preloadedState: { user: { details: mockUserDetails } },
    });

    await user.click(screen.getAllByRole('button')[0]);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
