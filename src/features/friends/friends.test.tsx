import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Friends } from './friends';

describe('Friends', () => {
  it('renders under construction message', () => {
    render(<Friends />);

    expect(screen.getByText('Under construction...')).toBeInTheDocument();
  });

  it('renders construction icon', () => {
    const { container } = render(<Friends />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
