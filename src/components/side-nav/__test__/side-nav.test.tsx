import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { SideNav } from '../side-nav';

describe('SideNav', () => {
  it('renders navigation element', () => {
    renderWithProviders(<SideNav />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders Home navigation tab', () => {
    renderWithProviders(<SideNav />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders Friends navigation tab', () => {
    renderWithProviders(<SideNav />);

    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /friends/i })).toHaveAttribute(
      'href',
      '/friends',
    );
  });

  it('renders Chat navigation tab', () => {
    renderWithProviders(<SideNav />);

    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /chat/i })).toHaveAttribute(
      'href',
      '/chat',
    );
  });

  it('renders Notifications navigation tab', () => {
    renderWithProviders(<SideNav />);

    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /notifications/i }),
    ).toHaveAttribute('href', '/notifications');
  });

  it('renders all four navigation tabs', () => {
    renderWithProviders(<SideNav />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });
});
