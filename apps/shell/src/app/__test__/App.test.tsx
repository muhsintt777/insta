import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, waitFor } from 'test';
import { App } from '../App';

vi.mock('@insta/ui/feedback/loader', () => ({
  BackdropLoader: () => <div data-testid="backdrop-loader">BackdropLoader</div>,
}));

vi.mock('@insta/ui/feedback/toast', () => ({
  ToastHost: () => <div data-testid="toast">Toast</div>,
}));

vi.mock('modules/home/home-page', () => ({
  HomePage: () => <div data-testid="home-page">HomePage</div>,
}));

vi.mock('modules/friends/friends', () => ({
  Friends: () => <div data-testid="friends-page">Friends</div>,
}));

vi.mock('modules/chat/chat', () => ({
  Chat: () => <div data-testid="chat-page">Chat</div>,
}));

vi.mock('modules/notifications/notifications', () => ({
  Notifications: () => (
    <div data-testid="notifications-page">Notifications</div>
  ),
}));

vi.mock('modules/user/profile-page', () => ({
  ProfilePage: () => <div data-testid="profile-page">ProfilePage</div>,
}));

vi.mock('app/session-workflows', () => ({
  restoreSession: () => ({ type: 'auth/restoreSession' }),
  signIn: vi.fn(),
}));

vi.mock('modules/auth', () => ({
  selectAuthStatus: (state: { auth: { status: string } }) => state.auth.status,
  LoginPage: () => <div data-testid="login-page">Login</div>,
  SignupPage: () => <div data-testid="signup-page">SignupPage</div>,
}));

vi.mock('app/layouts/primary-layout/primary-layout', () => ({
  PrimaryLayout: () => <div data-testid="primary-layout">PrimaryLayout</div>,
}));

vi.mock('app/layouts/auth-layout/auth-layout', () => ({
  AuthLayout: () => <div data-testid="auth-layout">AuthLayout</div>,
}));

vi.mock('app/layouts/secondary-layout', () => ({
  SecondaryLayout: () => (
    <div data-testid="secondary-layout">SecondaryLayout</div>
  ),
}));

vi.mock('@insta/ui/components/loaders/dot-loader', () => ({
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
    it('shows loader while auth status is LOADING', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'LOADING', token: null },
        },
        route: '/',
      });

      expect(screen.getByTestId('dot-loader')).toBeInTheDocument();
    });

    it('shows app logo during loading', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'LOADING', token: null },
        },
        route: '/',
      });

      expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('shows loading note message', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'LOADING', token: null },
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
          auth: { status: 'AUTHENTICATED', token: 'Bearer test-token' },
          user: { details: mockUserDetails },
        },
        route: '/',
      });

      expect(screen.getByTestId('backdrop-loader')).toBeInTheDocument();
    });

    it('renders Toast component', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'AUTHENTICATED', token: 'Bearer test-token' },
          user: { details: mockUserDetails },
        },
        route: '/',
      });

      expect(screen.getAllByTestId('toast')).toHaveLength(1);
    });

    it('renders routes when user is loaded', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'AUTHENTICATED', token: 'Bearer test-token' },
          user: { details: mockUserDetails },
        },
        route: '/',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('dot-loader')).not.toBeInTheDocument();
      });
    });
  });

  describe('failed state', () => {
    it('renders routes when auth status is FAILED', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'FAILED', token: null },
        },
        route: '/',
      });

      expect(screen.queryByTestId('dot-loader')).not.toBeInTheDocument();
    });
  });

  describe('logged out state', () => {
    it('renders routes when auth status is UNAUTHENTICATED', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: { status: 'UNAUTHENTICATED', token: null },
        },
        route: '/',
      });

      expect(screen.queryByTestId('dot-loader')).not.toBeInTheDocument();
    });
  });
});
