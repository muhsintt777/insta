import { describe, it, expect, vi } from 'vitest';
import { screen, render } from 'test-utils';
import { useAppSelector } from 'hooks/redux-hooks';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedRoute } from 'main/protected-route';

vi.mock('hooks/redux-hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

describe('ProtectedRoute', () => {
  it('renders children when user is logged in', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: { id: 'user-1', fullName: 'John Doe' },
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when user is not logged in', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: null,
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects when user details is undefined', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: undefined,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div data-testid="protected-content">Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});
