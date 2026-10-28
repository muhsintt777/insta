import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Notifications } from '../notifications';

describe('Notifications', () => {
  it('renders under construction message', () => {
    render(<Notifications />);

    expect(screen.getByText('Under construction...')).toBeInTheDocument();
  });

  it('renders construction icon', () => {
    const { container } = render(<Notifications />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
