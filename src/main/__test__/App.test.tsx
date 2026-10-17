import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, waitFor } from 'test-utils';
import { App } from '../App';

vi.mock('features/loader', () => ({
  BackdropLoader: () => <div data-testid="backdrop-loader">BackdropLoader</div>,
}));

vi.mock('features/toast/toast', () => ({
  Toast: () => <div data-testid="toast">Toast</div>,
}));

vi.mock('features/home/home-page', () => ({
  HomePage: () => <div data-testid="home-page">HomePage</div>,
}));

vi.mock('features/friends/friends', () => ({
  Friends: () => <div data-testid="friends-page">Friends</div>,
}));

vi.mock('features/chat/chat', () => ({
  Chat: () => <div data-testid="chat-page">Chat</div>,
}));

vi.mock('features/notifications/notifications', () => ({
  Notifications: () => (
    <div data-testid="notifications-page">Notifications</div>
  ),
}));

vi.mock('features/user/profile-page', () => ({
  ProfilePage: () => <div data-testid="profile-page">ProfilePage</div>,
}));

vi.mock('features/auth/login/login', () => ({
  Login: () => <div data-testid="login-page">Login</div>,
}));

vi.mock('features/auth/signup/signup-page', () => ({
  SignupPage: () => <div data-testid="signup-page">SignupPage</div>,
}));

vi.mock('layouts/primary-layout/primary-layout', () => ({
  PrimaryLayout: () => <div data-testid="primary-layout">PrimaryLayout</div>,
}));

vi.mock('layouts/auth-layout/auth-layout', () => ({
  AuthLayout: () => <div data-testid="auth-layout">AuthLayout</div>,
}));

vi.mock('layouts/secondary-layout', () => ({
  SecondaryLayout: () => (
    <div data-testid="secondary-layout">SecondaryLayout</div>
  ),
}));

vi.mock('../with-protected-route', () => ({
  protect: (Component: React.FC) => <Component />,
}));

vi.mock('components/loaders/dot-loader', () => ({
  DotLoader: () => <div data-testid="dot-loader">Loading...</div>,
}));

const mockUserDetails = {
  id: 'user-1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  profileImage: null,
  bio: 'Test bio',
  postCount: 10,
  friendsCount: 5,
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loading state', () => {
    it('shows loader when user status is LOADING', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'LOADING', details: null },
        },
        route: '/',
      });

      expect(screen.getByTestId('dot-loader')).toBeInTheDocument();
    });

    it('shows app logo during loading', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'LOADING', details: null },
        },
        route: '/',
      });

      expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('shows loading note message', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'LOADING', details: null },
        },
        route: '/',
      });

      expect(
        screen.getByText(/Initial loading may take a few extra seconds/i),
      ).toBeInTheDocument();
    });
  });

  describe('loaded state', () => {
    it('renders BackdropLoader', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
        route: '/',
      });

      expect(screen.getByTestId('backdrop-loader')).toBeInTheDocument();
    });

    it('renders Toast component', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
        route: '/',
      });

      expect(screen.getAllByTestId('toast')).toHaveLength(2);
    });

    it('renders routes when user is loaded', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
        route: '/',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('dot-loader')).not.toBeInTheDocument();
      });
    });
  });

  describe('failed state', () => {
    it('renders routes when user status is FAILED', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'FAILED', details: null },
        },
        route: '/',
      });

      expect(screen.queryByTestId('dot-loader')).not.toBeInTheDocument();
    });
  });

  describe('logged out state', () => {
    it('renders routes when user is LOGGED_OUT', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          user: { status: 'LOGGED_OUT', details: null },
        },
        route: '/',
      });

      expect(screen.queryByTestId('dot-loader')).not.toBeInTheDocument();
    });
  });
});
