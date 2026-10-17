import { describe, it, expect } from 'vitest';
import { renderWithProviders } from 'test-utils';
import { DotLoader } from '../dot-loader';

describe('DotLoader', () => {
  it('renders the loader element', () => {
    const { container } = renderWithProviders(<DotLoader />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('applies default color when not specified', () => {
    const { container } = renderWithProviders(<DotLoader />);

    const loader = container.firstChild as HTMLElement;
    expect(loader.style.getPropertyValue('--dot-color')).toBe(
      'var(--clr-white)',
    );
  });

  it('applies custom color when provided', () => {
    const { container } = renderWithProviders(<DotLoader color="red" />);

    const loader = container.firstChild as HTMLElement;
    expect(loader.style.getPropertyValue('--dot-color')).toBe('red');
  });

  it('applies custom CSS variable color', () => {
    const { container } = renderWithProviders(
      <DotLoader color="var(--clr-primary)" />,
    );

    const loader = container.firstChild as HTMLElement;
    expect(loader.style.getPropertyValue('--dot-color')).toBe(
      'var(--clr-primary)',
    );
  });
});
