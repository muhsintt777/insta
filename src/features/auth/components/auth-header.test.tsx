import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthHeader } from './auth-header';

describe('AuthHeader', () => {
  it('renders the title', () => {
    render(<AuthHeader title="LOGIN" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'LOGIN',
    );
  });

  it('renders different titles', () => {
    render(<AuthHeader title="SIGNUP" />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'SIGNUP',
    );
  });

  it('renders as h1 element', () => {
    render(<AuthHeader title="Test Title" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.tagName).toBe('H1');
  });
});
