import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, render, userEvent } from 'test-utils';
import { PostCard, PostCardSkeleton } from '../post-card';

describe('PostCard', () => {
  const defaultProps = {
    fullname: 'John Doe',
    image: 'https://example.com/image.jpg',
    caption: 'Test caption',
    likeCount: 10,
    commentCount: 5,
    userProfileImage: 'https://example.com/profile.jpg',
    isLiked: false,
    createdAt: new Date().toISOString(),
    onLike: vi.fn(),
    onComment: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user fullname', () => {
    render(<PostCard {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders caption', () => {
    render(<PostCard {...defaultProps} />);

    expect(screen.getByText('Test caption')).toBeInTheDocument();
  });

  it('renders image', () => {
    render(<PostCard {...defaultProps} />);

    const img = screen.getByAltText('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('renders like count', () => {
    render(<PostCard {...defaultProps} />);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders comment count', () => {
    render(<PostCard {...defaultProps} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', async () => {
    const user = userEvent.setup();
    const onLike = vi.fn();

    render(<PostCard {...defaultProps} onLike={onLike} />);

    const buttons = screen.getAllByRole('button');
    const likeButton = buttons[0];
    await user.click(likeButton);

    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it('calls onComment when comment button is clicked', async () => {
    const user = userEvent.setup();
    const onComment = vi.fn();

    render(<PostCard {...defaultProps} onComment={onComment} />);

    const buttons = screen.getAllByRole('button');
    const commentButton = buttons[1];
    await user.click(commentButton);

    expect(onComment).toHaveBeenCalledTimes(1);
  });

  it('does not show menu button when no onDelete or onEdit provided', () => {
    render(<PostCard {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    // Only like and comment buttons should be present
    expect(buttons).toHaveLength(2);
  });

  it('shows menu button when onDelete is provided', () => {
    const onDelete = vi.fn();

    render(<PostCard {...defaultProps} onDelete={onDelete} />);

    const buttons = screen.getAllByRole('button');
    // Like, comment, and menu buttons should be present
    expect(buttons).toHaveLength(3);
  });

  it('shows menu button when onEdit is provided', () => {
    const onEdit = vi.fn();

    render(<PostCard {...defaultProps} onEdit={onEdit} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  it('opens menu when menu button is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<PostCard {...defaultProps} onDelete={onDelete} />);

    const buttons = screen.getAllByRole('button');
    const menuButton = buttons[0]; // Menu button is first
    await user.click(menuButton);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onEdit when Edit menu item is clicked', async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();

    render(<PostCard {...defaultProps} onEdit={onEdit} />);

    const buttons = screen.getAllByRole('button');
    const menuButton = buttons[0];
    await user.click(menuButton);

    await user.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Delete menu item is clicked', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn().mockResolvedValue(undefined);

    render(<PostCard {...defaultProps} onDelete={onDelete} />);

    const buttons = screen.getAllByRole('button');
    const menuButton = buttons[0];
    await user.click(menuButton);

    await user.click(screen.getByText('Delete'));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customStyles = { backgroundColor: 'red' };

    const { container } = render(
      <PostCard {...defaultProps} customStyles={customStyles} />,
    );

    const article = container.querySelector('article');
    expect(article?.style.backgroundColor).toBe('red');
  });
});

describe('PostCardSkeleton', () => {
  it('renders skeleton with aria-busy', () => {
    render(<PostCardSkeleton />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-busy', 'true');
  });

  it('renders skeleton with aria-label', () => {
    render(<PostCardSkeleton />);

    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'Loading post');
  });
});
