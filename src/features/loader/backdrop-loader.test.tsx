import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { BackdropLoader } from './backdrop-loader';

vi.mock('./Circle-loader', () => ({
  CircleLoader: ({ size }: { size: string }) => (
    <div data-testid="circle-loader" data-size={size}>
      Loading
    </div>
  ),
}));

describe('BackdropLoader', () => {
  it('renders backdrop when showBackdrop is true', () => {
    renderWithProviders(<BackdropLoader />, {
      preloadedState: {
        loader: { showBackdrop: true },
      },
    });

    expect(screen.getByTestId('circle-loader')).toBeInTheDocument();
  });

  it('renders backdrop with open=false when showBackdrop is false', () => {
    const { container } = renderWithProviders(<BackdropLoader />, {
      preloadedState: {
        loader: { showBackdrop: false },
      },
    });

    // Backdrop is not visible when closed
    const backdrop = container.querySelector('.MuiBackdrop-root');
    expect(backdrop).toHaveStyle({ visibility: 'hidden' });
  });

  it('renders CircleLoader with large size', () => {
    renderWithProviders(<BackdropLoader />, {
      preloadedState: {
        loader: { showBackdrop: true },
      },
    });

    expect(screen.getByTestId('circle-loader')).toHaveAttribute(
      'data-size',
      'large',
    );
  });
});
