import { describe, it, expect, vi } from 'vitest';
import { render, screen } from 'test-utils';
import { CreatePost } from '../create-post';

describe('CreatePost', () => {
  it('renders body content', () => {
    const mockOnClose = vi.fn();

    render(<CreatePost onClose={mockOnClose} />);

    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('renders container element', () => {
    const mockOnClose = vi.fn();

    const { container } = render(<CreatePost onClose={mockOnClose} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
