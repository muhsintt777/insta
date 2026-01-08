import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { SecondaryLayout } from './secondary-layout';
import { Route, Routes } from 'react-router-dom';

// Mock the Header component to avoid AuthService import chain
vi.mock('components/headers/app-header', () => ({
  Header: () => <header data-testid="mock-header">Header</header>,
}));

describe('SecondaryLayout', () => {
  it('renders the header', () => {
    renderWithProviders(<SecondaryLayout />, { route: '/' });

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('renders outlet content when route matches', () => {
    renderWithProviders(
      <Routes>
        <Route element={<SecondaryLayout />}>
          <Route path="/" element={<div>Outlet Content</div>} />
        </Route>
      </Routes>,
      { route: '/' },
    );

    expect(screen.getByText('Outlet Content')).toBeInTheDocument();
  });

  it('renders nested outlet content correctly', () => {
    renderWithProviders(
      <Routes>
        <Route element={<SecondaryLayout />}>
          <Route path="/test" element={<div>Test Page</div>} />
        </Route>
      </Routes>,
      { route: '/test' },
    );

    expect(screen.getByText('Test Page')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
