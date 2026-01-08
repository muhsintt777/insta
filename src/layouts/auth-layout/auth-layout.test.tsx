import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { AuthLayout } from './auth-layout';
import { Route, Routes } from 'react-router-dom';

// Mock the Header component to avoid AuthService import chain
vi.mock('components/headers/app-header', () => ({
  Header: () => <header data-testid="mock-header">Header</header>,
}));

describe('AuthLayout', () => {
  it('renders the header', () => {
    renderWithProviders(<AuthLayout />, { route: '/' });

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders outlet content when route matches', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<div>Login Page</div>} />
        </Route>
      </Routes>,
      { route: '/' },
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders signup page in outlet', () => {
    renderWithProviders(
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<div>Signup Page</div>} />
        </Route>
      </Routes>,
      { route: '/signup' },
    );

    expect(screen.getByText('Signup Page')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
