import { describe, it, expect, vi } from 'vitest';
import { screen, render } from 'test';
import { ProtectedRoute } from '../protected-route';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

vi.mock('shared/hooks/redux-hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

describe('ProtectedRoute', () => {
  const renderProtectedRoute = () =>
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<div data-testid="protected-content">Protected Content</div>}
            />
          </Route>
          <Route path="/auth/login" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>,
    );

  it('renders children when user is logged in', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: { id: 'user-1', fullName: 'John Doe' },
    });

    renderProtectedRoute();

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when user is not logged in', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: null,
    });

    renderProtectedRoute();

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('current-path')).toHaveTextContent('/auth/login');
  });

  it('redirects when user details is undefined', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: undefined,
    });

    renderProtectedRoute();

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});

const LocationProbe = () => {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
};
