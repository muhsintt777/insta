import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { SignupPage } from './signup-page';
import { AuthService } from '../auth-service';
import { UserService } from 'features/user/user-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('../auth-service', () => ({
  AuthService: {
    createUser: vi.fn(),
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

vi.mock('features/toast/useToast', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form with all elements', () => {
    renderWithProviders(<SignupPage />);

    expect(
      screen.getByRole('heading', { name: /signup/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('john_doe_123')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('johndoe@gmail.com'),
    ).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('********')).toHaveLength(2);
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it('shows link to login page', () => {
    renderWithProviders(<SignupPage />);

    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toHaveAttribute('href', '/auth/login');
  });

  it('shows profile image upload field', () => {
    renderWithProviders(<SignupPage />);

    expect(screen.getByText(/profile image/i)).toBeInTheDocument();
  });

  describe('form validation', () => {
    it('shows validation errors for empty required fields on submit', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SignupPage />);

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/full name must be at least 3 characters/i),
        ).toBeInTheDocument();
      });
    });

    it('shows error for invalid email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SignupPage />);

      const emailInput = screen.getByPlaceholderText('johndoe@gmail.com');
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('shows error for password mismatch', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SignupPage />);

      // Fill all required fields first
      await user.type(screen.getByPlaceholderText('John Doe'), 'John Doe');
      await user.type(screen.getByPlaceholderText('john_doe_123'), 'john_doe');
      await user.type(
        screen.getByPlaceholderText('johndoe@gmail.com'),
        'john@example.com',
      );

      const passwordInputs = screen.getAllByPlaceholderText('********');
      await user.type(passwordInputs[0], 'Password@123');
      await user.type(passwordInputs[1], 'DifferentPassword@123');

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    const validFormData = {
      fullName: 'John Doe',
      username: 'john_doe_123',
      email: 'john@example.com',
      password: 'Password@123',
      confirmPassword: 'Password@123',
    };

    it('submits form with valid data', async () => {
      const user = userEvent.setup();
      const mockUser = { id: '1', username: 'john_doe_123' };

      (AuthService.createUser as Mock).mockResolvedValue({});
      (AuthService.login as Mock).mockResolvedValue({});
      (UserService.fetchCurrentUser as Mock).mockResolvedValue(mockUser);

      renderWithProviders(<SignupPage />);

      await user.type(
        screen.getByPlaceholderText('John Doe'),
        validFormData.fullName,
      );
      await user.type(
        screen.getByPlaceholderText('john_doe_123'),
        validFormData.username,
      );
      await user.type(
        screen.getByPlaceholderText('johndoe@gmail.com'),
        validFormData.email,
      );
      const passwordInputs = screen.getAllByPlaceholderText('********');
      await user.type(passwordInputs[0], validFormData.password);
      await user.type(passwordInputs[1], validFormData.confirmPassword);

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(AuthService.createUser).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(AuthService.login).toHaveBeenCalledWith({
          email: validFormData.email,
          password: validFormData.password,
        });
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('handles signup error', async () => {
      const user = userEvent.setup();
      const mockError = new Error('Signup failed');

      (AuthService.createUser as Mock).mockRejectedValue(mockError);

      renderWithProviders(<SignupPage />);

      await user.type(
        screen.getByPlaceholderText('John Doe'),
        validFormData.fullName,
      );
      await user.type(
        screen.getByPlaceholderText('john_doe_123'),
        validFormData.username,
      );
      await user.type(
        screen.getByPlaceholderText('johndoe@gmail.com'),
        validFormData.email,
      );
      const passwordInputs = screen.getAllByPlaceholderText('********');
      await user.type(passwordInputs[0], validFormData.password);
      await user.type(passwordInputs[1], validFormData.confirmPassword);

      const submitButton = screen.getByRole('button', {
        name: /create account/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
      });
    });
  });
});
