import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { CustomMenu } from './custom-menu';

describe('CustomMenu', () => {
  const mockItems = [
    { label: 'Profile', onClick: vi.fn() },
    { label: 'Settings', onClick: vi.fn() },
    { label: 'Logout', onClick: vi.fn() },
  ];

  it('does not render menu when anchorEl is null', () => {
    renderWithProviders(
      <CustomMenu anchorEl={null} onClose={vi.fn()} items={mockItems} />,
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('renders menu when anchorEl is provided', () => {
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);

    renderWithProviders(
      <CustomMenu anchorEl={anchorEl} onClose={vi.fn()} items={mockItems} />,
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();

    document.body.removeChild(anchorEl);
  });

  it('renders all menu items', () => {
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);

    renderWithProviders(
      <CustomMenu anchorEl={anchorEl} onClose={vi.fn()} items={mockItems} />,
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    document.body.removeChild(anchorEl);
  });

  it('calls item onClick when menu item is clicked', async () => {
    const user = userEvent.setup();
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);

    const handleClick = vi.fn();
    const items = [{ label: 'Profile', onClick: handleClick }];

    renderWithProviders(
      <CustomMenu anchorEl={anchorEl} onClose={vi.fn()} items={items} />,
    );

    await user.click(screen.getByText('Profile'));

    expect(handleClick).toHaveBeenCalledOnce();

    document.body.removeChild(anchorEl);
  });

  it('calls onClose when menu item is clicked', async () => {
    const user = userEvent.setup();
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);

    const handleClose = vi.fn();
    const items = [{ label: 'Profile', onClick: vi.fn() }];

    renderWithProviders(
      <CustomMenu anchorEl={anchorEl} onClose={handleClose} items={items} />,
    );

    await user.click(screen.getByText('Profile'));

    expect(handleClose).toHaveBeenCalled();

    document.body.removeChild(anchorEl);
  });

  it('renders menu items with icons when provided', () => {
    const anchorEl = document.createElement('button');
    document.body.appendChild(anchorEl);

    const itemsWithIcons = [
      {
        label: 'Profile',
        onClick: vi.fn(),
        icon: <span data-testid="profile-icon">👤</span>,
      },
    ];

    renderWithProviders(
      <CustomMenu
        anchorEl={anchorEl}
        onClose={vi.fn()}
        items={itemsWithIcons}
      />,
    );

    expect(screen.getByTestId('profile-icon')).toBeInTheDocument();

    document.body.removeChild(anchorEl);
  });
});
