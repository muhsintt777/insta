import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { Header } from '../app-header';

// Mock AuthService to avoid axios import chain
vi.mock('features/auth/auth-service', () => ({
  AuthService: {
    signout: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock handleErrorWithToast
vi.mock('features/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

describe('Header', () => {
  describe('when user is not logged in', () => {
    it('renders app logo', () => {
      renderWithProviders(<Header />);

      expect(screen.getByAltText('app-logo')).toBeInTheDocument();
    });

    it('does not render profile section when user status is not SUCCESS', () => {
      renderWithProviders(<Header />, {
        preloadedState: {
          user: { status: 'LOADING', details: null },
        },
      });

      expect(
        screen.queryByRole('img', { name: /avatar/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    const loggedInState = {
      user: {
        status: 'SUCCESS' as const,
        details: {
          id: 1,
          username: 'johndoe',
          email: 'john@test.com',
          fullName: 'John Doe',
          profileImage: null,
          bio: '',
          postCount: 0,
          friendsCount: 0,
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      },
    };

    it('renders username', () => {
      renderWithProviders(<Header />, {
        preloadedState: loggedInState,
      });

      expect(screen.getByText('johndoe')).toBeInTheDocument();
    });

    it('opens menu when profile is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header />, {
        preloadedState: loggedInState,
      });

      const profileSection = screen.getByText('johndoe');
      await user.click(profileSection);

      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Switch Theme')).toBeInTheDocument();
      expect(screen.getByText('Signout')).toBeInTheDocument();
    });

    it('closes menu when menu item is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header />, {
        preloadedState: loggedInState,
      });

      const profileSection = screen.getByText('johndoe');
      await user.click(profileSection);

      const switchThemeItem = screen.getByText('Switch Theme');
      await user.click(switchThemeItem);

      // Menu should close after clicking
      expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    });
  });
});
