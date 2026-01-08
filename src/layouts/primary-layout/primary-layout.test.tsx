import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { PrimaryLayout } from './primary-layout';
import { Route, Routes } from 'react-router-dom';

// Mock the Header component to avoid AuthService import chain
vi.mock('components/headers/app-header', () => ({
  Header: () => <header data-testid="mock-header">Header</header>,
}));

describe('PrimaryLayout', () => {
  it('renders the header', () => {
    renderWithProviders(<PrimaryLayout />, { route: '/' });

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders outlet content when route matches', () => {
    renderWithProviders(
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/" element={<div>Home Page</div>} />
        </Route>
      </Routes>,
      { route: '/' },
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  it('renders different routes through outlet', () => {
    renderWithProviders(
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Route>
      </Routes>,
      { route: '/profile' },
    );

    expect(screen.getByText('Profile Page')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders friends page in outlet', () => {
    renderWithProviders(
      <Routes>
        <Route element={<PrimaryLayout />}>
          <Route path="/friends" element={<div>Friends Page</div>} />
        </Route>
      </Routes>,
      { route: '/friends' },
    );

    expect(screen.getByText('Friends Page')).toBeInTheDocument();
  });
});
