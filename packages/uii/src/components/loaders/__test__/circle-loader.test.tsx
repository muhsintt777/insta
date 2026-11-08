import { describe, it, expect } from 'vitest';
import { render, screen } from 'test';
import { CircleLoader } from '../circle-loader';

describe('CircleLoader', () => {
  it('renders circular progress element', () => {
    render(<CircleLoader />);

    expect(
      document.querySelector('.MuiCircularProgress-root'),
    ).toBeInTheDocument();
  });

  it('renders with each supported size', () => {
    const sizes = ['small', 'medium', 'large'] as const;

    sizes.forEach((size) => {
      const { unmount } = render(<CircleLoader size={size} />);

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      unmount();
    });
  });
});
