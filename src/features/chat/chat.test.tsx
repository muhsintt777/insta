import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Chat } from './chat';

describe('Chat', () => {
  it('renders under construction message', () => {
    render(<Chat />);

    expect(screen.getByText('Under construction...')).toBeInTheDocument();
  });

  it('renders construction icon', () => {
    const { container } = render(<Chat />);

    // Check for SVG element (ConstructionIcon renders as SVG)
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
