import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { WheatherActionButton } from './wheather-action-button';

describe('WheatherActionButton', () => {
  it('renders the weather button with icon', () => {
    renderWithProviders(<WheatherActionButton />);

    const button = screen.getByRole('button', { name: /weather/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with correct accessibility label', () => {
    renderWithProviders(<WheatherActionButton />);

    expect(screen.getByLabelText('Weather')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(<WheatherActionButton onClick={handleClick} />);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  it('does not throw error when onClick is not provided', async () => {
    const user = userEvent.setup();

    renderWithProviders(<WheatherActionButton />);

    await user.click(screen.getByRole('button'));
    // Test passes if no error is thrown
  });

  it('renders with button type', () => {
    renderWithProviders(<WheatherActionButton />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('has circular styling with correct class', () => {
    const { container } = renderWithProviders(<WheatherActionButton />);

    const button = container.querySelector('button');
    expect(button?.className).toMatch(/container/);
  });

  it('contains the sun icon', () => {
    renderWithProviders(<WheatherActionButton />);

    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
