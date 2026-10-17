import { describe, it, expect } from 'vitest';
import { screen, renderWithProviders } from 'test-utils';
import { SectionHeader } from '../section-header';

describe('SectionHeader', () => {
  it('renders title correctly', () => {
    renderWithProviders(<SectionHeader title="My Section" />);

    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  it('applies custom styles when provided', () => {
    const { container } = renderWithProviders(
      <SectionHeader
        title="Styled Section"
        style={{ backgroundColor: 'blue' }}
      />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.backgroundColor).toBe('blue');
  });

  it('renders without custom styles', () => {
    const { container } = renderWithProviders(
      <SectionHeader title="Plain Section" />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });
});
