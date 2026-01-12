import { describe, it, expect, vi } from 'vitest';
import { screen, render } from 'test-utils';
import { protect } from './with-protected-route';
import { useAppSelector } from 'hooks/redux-hooks';
import { MemoryRouter } from 'react-router-dom';
import { FC } from 'react';

vi.mock('hooks/redux-hooks', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

const MockComponent: FC = () => <div data-testid="mock-component">Mock</div>;

describe('protect (withProtectedRoute)', () => {
  it('renders protected component when user is logged in', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: { id: 'user-1', fullName: 'John Doe' },
    });

    const ProtectedComponent = protect(MockComponent);

    render(<MemoryRouter>{ProtectedComponent}</MemoryRouter>);

    expect(screen.getByTestId('mock-component')).toBeInTheDocument();
  });

  it('does not render protected component when user is not logged in', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: null,
    });

    const ProtectedComponent = protect(MockComponent);

    render(<MemoryRouter>{ProtectedComponent}</MemoryRouter>);

    expect(screen.queryByTestId('mock-component')).not.toBeInTheDocument();
  });

  it('returns JSX element that can be used in Routes', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue({
      details: { id: 'user-1' },
    });

    const result = protect(MockComponent);

    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });
});
