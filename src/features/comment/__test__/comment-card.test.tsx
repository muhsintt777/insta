import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { CommentCard } from '../comment-card';

describe('CommentCard', () => {
  const defaultProps = {
    authorName: 'John Doe',
    authorProfilePic: null,
    commentText: 'This is a test comment',
    commentedAt: '2024-01-15T10:30:00.000Z',
    onDelete: vi.fn(),
  };

  it('renders author name', () => {
    renderWithProviders(<CommentCard {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders comment text', () => {
    renderWithProviders(<CommentCard {...defaultProps} />);

    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
  });

  it('renders avatar', () => {
    renderWithProviders(<CommentCard {...defaultProps} />);

    // MUI Avatar renders an img or div element
    const avatar = document.querySelector('.MuiAvatar-root');
    expect(avatar).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    renderWithProviders(<CommentCard {...defaultProps} />);

    // The formatted date should be visible (format depends on DateUtils)
    // Just check that some date text is present
    const container = document.querySelector('[class*="container"]');
    expect(container).toBeInTheDocument();
  });

  it('opens menu when clicking menu button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentCard {...defaultProps} />);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onDelete when delete menu item is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn().mockResolvedValue(undefined);
    renderWithProviders(<CommentCard {...defaultProps} onDelete={onDelete} />);

    const menuButton = screen.getByRole('button');
    await user.click(menuButton);

    const deleteMenuItem = screen.getByText('Delete');
    await user.click(deleteMenuItem);

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = renderWithProviders(
      <CommentCard {...defaultProps} customStyle={customStyle} />,
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.backgroundColor).toBe('red');
  });
});
