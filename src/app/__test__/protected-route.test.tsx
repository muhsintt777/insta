import { describe, it, expect, vi } from 'vitest';
import { screen, render } from 'test';
import { ProtectedRoute } from '../protected-route';
import { useAppSelector } from 'app/hooks/redux-hooks';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

vi.mock('app/hooks/redux-hooks', () => ({
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
              element={
                <div data-testid="protected-content">Protected Content</div>
              }
            />
          </Route>
          <Route path="/auth/login" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>,
    );

  it('renders outlet content when authenticated', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue(
      'AUTHENTICATED',
    );

    renderProtectedRoute();

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to login when unauthenticated', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue(
      'UNAUTHENTICATED',
    );

    renderProtectedRoute();

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('current-path')).toHaveTextContent('/auth/login');
  });

  it('redirects when auth status is not authenticated', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue('FAILED');

    renderProtectedRoute();

    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});

const LocationProbe = () => {
  const location = useLocation();
  return <div data-testid="current-path">{location.pathname}</div>;
};
