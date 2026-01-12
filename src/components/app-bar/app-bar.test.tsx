import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { AppBar } from './app-bar';

describe('AppBar', () => {
  it('renders title correctly', () => {
    const onBackClick = vi.fn();

    renderWithProviders(<AppBar title="My Title" onBackClick={onBackClick} />);

    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('calls onBackClick when back button is clicked', async () => {
    const user = userEvent.setup();
    const onBackClick = vi.fn();

    renderWithProviders(<AppBar title="Test" onBackClick={onBackClick} />);

    const backButton = screen.getByRole('button');
    await user.click(backButton);

    expect(onBackClick).toHaveBeenCalledOnce();
  });

  it('applies custom styles when provided', () => {
    const onBackClick = vi.fn();
    const customStyles = { backgroundColor: 'red' };

    const { container } = renderWithProviders(
      <AppBar
        title="Styled"
        onBackClick={onBackClick}
        customStyles={customStyles}
      />,
    );

    const appBarContainer = container.firstChild as HTMLElement;
    expect(appBarContainer.style.backgroundColor).toBe('red');
  });
});
