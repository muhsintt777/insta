import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders } from 'test';
import { BackdropLoader } from '../backdrop-loader';

vi.mock('shared/components/loaders/circle-loader', () => ({
  CircleLoader: ({ size }: { size: string }) => (
    <div data-testid="circle-loader" data-size={size}>
      Loading
    </div>
  ),
}));

describe('BackdropLoader', () => {
  it('renders backdrop when showBackdrop is true', () => {
    renderWithProviders(<BackdropLoader />, {
      preloadedState: { loader: { showBackdrop: true } },
    });

    expect(screen.getByTestId('circle-loader')).toBeInTheDocument();
  });

  it('hides the backdrop when showBackdrop is false', () => {
    const { container } = renderWithProviders(<BackdropLoader />, {
      preloadedState: { loader: { showBackdrop: false } },
    });

    expect(container.querySelector('.MuiBackdrop-root')).toHaveStyle({
      visibility: 'hidden',
    });
  });

  it('uses a large spinner', () => {
    renderWithProviders(<BackdropLoader />, {
      preloadedState: { loader: { showBackdrop: true } },
    });

    expect(screen.getByTestId('circle-loader')).toHaveAttribute(
      'data-size',
      'large',
    );
  });
});