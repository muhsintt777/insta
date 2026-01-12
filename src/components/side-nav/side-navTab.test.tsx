import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { SideNavTab } from './side-navTab';
import { FC } from 'react';
import { IconsProps } from 'utils/types';

// Mock Icon component for testing
const MockIcon: FC<IconsProps> = ({ color }) => (
  <span data-testid="mock-icon" style={{ color }}>
    Icon
  </span>
);

describe('SideNavTab', () => {
  it('renders tab with name', () => {
    renderWithProviders(
      <SideNavTab path="/home" name="Home" Icon={MockIcon} />,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders as a link with correct href', () => {
    renderWithProviders(
      <SideNavTab path="/profile" name="Profile" Icon={MockIcon} />,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/profile');
  });

  it('renders the icon component', () => {
    renderWithProviders(
      <SideNavTab path="/home" name="Home" Icon={MockIcon} />,
    );

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('applies active styles when route matches', () => {
    renderWithProviders(<SideNavTab path="/" name="Home" Icon={MockIcon} />, {
      route: '/',
    });

    const link = screen.getByRole('link');
    expect(link.className).toContain('tabActive');
  });

  it('applies inactive styles when route does not match', () => {
    renderWithProviders(
      <SideNavTab path="/profile" name="Profile" Icon={MockIcon} />,
      {
        route: '/',
      },
    );

    const link = screen.getByRole('link');
    expect(link.className).not.toContain('tabActive');
  });

  it('renders with different paths correctly', () => {
    renderWithProviders(
      <SideNavTab path="/notifications" name="Notifications" Icon={MockIcon} />,
    );

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/notifications');
  });
});
