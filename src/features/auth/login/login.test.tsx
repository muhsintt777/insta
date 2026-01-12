import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { Login } from './login';
import { AuthService } from '../auth-service';
import { UserService } from 'features/user/user-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('../auth-service', () => ({
  AuthService: {
    login: vi.fn(),
  },
}));

vi.mock('features/user/user-service', () => ({
  UserService: {
    fetchCurrentUser: vi.fn(),
  },
}));

vi.mock('features/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with all elements', () => {
    renderWithProviders(<Login />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('john@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password@123')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it('shows link to signup page', () => {
    renderWithProviders(<Login />);

    const signupLink = screen.getByRole('link', { name: /create account/i });
    expect(signupLink).toHaveAttribute('href', '/auth/signup');
  });

  it('shows SSO coming soon message', () => {
    renderWithProviders(<Login />);

    expect(screen.getByText(/sso coming soon/i)).toBeInTheDocument();
  });

  describe('email validation', () => {
    it('shows error for invalid email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const emailInput = screen.getByPlaceholderText('john@email.com');
      await user.type(emailInput, 'invalid-email');

      expect(screen.getByText(/please enter valid email/i)).toBeInTheDocument();
    });

    it('does not show error for valid email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const emailInput = screen.getByPlaceholderText('john@email.com');
      await user.type(emailInput, 'test@example.com');

      expect(
        screen.queryByText(/please enter valid email/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('password validation', () => {
    it('shows error for invalid password', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const passwordInput = screen.getByPlaceholderText('Password@123');
      await user.type(passwordInput, 'weak');

      expect(
        screen.getByText(/please enter valid password/i),
      ).toBeInTheDocument();
    });

    it('does not show error for valid password', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const passwordInput = screen.getByPlaceholderText('Password@123');
      await user.type(passwordInput, 'Password@123');

      expect(
        screen.queryByText(/please enter valid password/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('does not submit when fields are invalid', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Login />);

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      expect(AuthService.login).not.toHaveBeenCalled();
    });

    it('submits form with valid credentials', async () => {
      const user = userEvent.setup();
      const mockUser = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
      };

      (AuthService.login as Mock).mockResolvedValue({});
      (UserService.fetchCurrentUser as Mock).mockResolvedValue(mockUser);

      renderWithProviders(<Login />);

      const emailInput = screen.getByPlaceholderText('john@email.com');
      const passwordInput = screen.getByPlaceholderText('Password@123');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password@123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(AuthService.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password@123',
        });
      });

      await waitFor(() => {
        expect(UserService.fetchCurrentUser).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
      });
    });

    it('handles login error', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Login failed');

      (AuthService.login as Mock).mockRejectedValue(mockError);

      renderWithProviders(<Login />);

      const emailInput = screen.getByPlaceholderText('john@email.com');
      const passwordInput = screen.getByPlaceholderText('Password@123');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password@123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
      });
    });

    it('trims whitespace from email and password', async () => {
      const user = userEvent.setup();
      const mockUser = { id: '1', username: 'testuser' };

      (AuthService.login as Mock).mockResolvedValue({});
      (UserService.fetchCurrentUser as Mock).mockResolvedValue(mockUser);

      renderWithProviders(<Login />);

      const emailInput = screen.getByPlaceholderText('john@email.com');
      const passwordInput = screen.getByPlaceholderText('Password@123');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, ' test@example.com ');
      await user.type(passwordInput, ' Password@123 ');
      await user.click(submitButton);

      await waitFor(() => {
        expect(AuthService.login).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password@123',
        });
      });
    });
  });
});
