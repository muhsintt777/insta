import { describe, it, expect } from 'vitest';
import { renderWithProviders } from 'test-utils';
import { CustomAvatar } from './custom-avatar';

describe('CustomAvatar', () => {
  it('renders avatar element', () => {
    const { container } = renderWithProviders(<CustomAvatar />);

    expect(container.querySelector('.MuiAvatar-root')).toBeInTheDocument();
  });

  it('renders with src when provided', () => {
    const { container } = renderWithProviders(
      <CustomAvatar src="https://example.com/avatar.jpg" />,
    );

    const avatar = container.querySelector('.MuiAvatar-root img');
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('shows fallback icon when src is null', () => {
    const { container } = renderWithProviders(<CustomAvatar src={null} />);

    // MUI shows fallback PersonIcon when no valid src
    expect(
      container.querySelector('[data-testid="PersonIcon"]'),
    ).toBeInTheDocument();
  });

  it('applies default size when not specified', () => {
    const { container } = renderWithProviders(<CustomAvatar />);

    const avatar = container.querySelector('.MuiAvatar-root');
    expect(avatar).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('applies custom size when provided', () => {
    const { container } = renderWithProviders(<CustomAvatar size="60px" />);

    const avatar = container.querySelector('.MuiAvatar-root');
    expect(avatar).toHaveStyle({ width: '60px', height: '60px' });
  });
});
