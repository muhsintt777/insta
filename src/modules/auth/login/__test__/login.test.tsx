import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test';
import { LoginPage } from '../login';
import { handleErrorWithToast } from 'shared/feedback/toast';

vi.mock('shared/feedback/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

const mockOnSignIn = vi.fn().mockResolvedValue(undefined);
const renderLoginPage = () =>
  renderWithProviders(<LoginPage onSignIn={mockOnSignIn} />);

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSignIn.mockResolvedValue(undefined);
  });

  it('renders login form with all elements', () => {
    renderLoginPage();

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
    renderLoginPage();

    const signupLink = screen.getByRole('link', { name: /create account/i });
    expect(signupLink).toHaveAttribute('href', '/auth/signup');
  });

  it('shows SSO coming soon message', () => {
    renderLoginPage();

    expect(screen.getByText(/sso coming soon/i)).toBeInTheDocument();
  });

  describe('email validation', () => {
    it('shows error for invalid email', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('john@email.com');
      await user.type(emailInput, 'invalid-email');

      expect(screen.getByText(/please enter valid email/i)).toBeInTheDocument();
    });

    it('does not show error for valid email', async () => {
      const user = userEvent.setup();
      renderLoginPage();

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
      renderLoginPage();

      const passwordInput = screen.getByPlaceholderText('Password@123');
      await user.type(passwordInput, 'weak');

      expect(
        screen.getByText(/please enter valid password/i),
      ).toBeInTheDocument();
    });

    it('does not show error for valid password', async () => {
      const user = userEvent.setup();
      renderLoginPage();

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
      renderLoginPage();

      const submitButton = screen.getByRole('button', { name: /login/i });
      await user.click(submitButton);

      expect(mockOnSignIn).not.toHaveBeenCalled();
    });

    it('submits form with valid credentials', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('john@email.com');
      const passwordInput = screen.getByPlaceholderText('Password@123');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password@123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSignIn).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password@123',
        });
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
      });
    });

    it('handles login error', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Login failed');

      mockOnSignIn.mockRejectedValue(mockError);

      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('john@email.com');
      const passwordInput = screen.getByPlaceholderText('Password@123');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'Password@123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(handleErrorWithToast).toHaveBeenCalledWith(
          mockError,
          expect.any(Function),
        );
      });
    });

    it('trims whitespace from email and password', async () => {
      const user = userEvent.setup();
      renderLoginPage();

      const emailInput = screen.getByPlaceholderText('john@email.com');
      const passwordInput = screen.getByPlaceholderText('Password@123');
      const submitButton = screen.getByRole('button', { name: /login/i });

      await user.type(emailInput, ' test@example.com ');
      await user.type(passwordInput, ' Password@123 ');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSignIn).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password@123',
        });
      });
    });
  });
});
