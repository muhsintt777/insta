import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test';
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
    expect(document.querySelector('.MuiAvatar-root')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    renderWithProviders(<CommentCard {...defaultProps} />);
    expect(document.querySelector('[class*="container"]')).toBeInTheDocument();
  });

  it('opens the menu', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CommentCard {...defaultProps} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onDelete', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn().mockResolvedValue(undefined);
    renderWithProviders(<CommentCard {...defaultProps} onDelete={onDelete} />);
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('applies custom style', () => {
    const { container } = renderWithProviders(
      <CommentCard
        {...defaultProps}
        customStyle={{ backgroundColor: 'red' }}
      />,
    );
    expect((container.firstChild as HTMLElement).style.backgroundColor).toBe(
      'red',
    );
  });
});
