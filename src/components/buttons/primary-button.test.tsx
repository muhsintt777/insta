import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { PrimaryButton } from './primary-button';

describe('PrimaryButton', () => {
  it('renders button text correctly', () => {
    renderWithProviders(<PrimaryButton text="Click Me" />);

    expect(
      screen.getByRole('button', { name: 'Click Me' }),
    ).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(<PrimaryButton text="Submit" onClick={handleClick} />);

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithProviders(
      <PrimaryButton text="Submit" onClick={vi.fn()} disabled />,
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeDisabled();
  });

  it('shows loader when showLoader is true', () => {
    renderWithProviders(<PrimaryButton text="Submit" showLoader />);

    // When loader is shown, the text should not be visible
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('renders with correct button type', () => {
    renderWithProviders(<PrimaryButton text="Submit" type="submit" />);

    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it('defaults to button type when not specified', () => {
    renderWithProviders(<PrimaryButton text="Click" />);

    expect(screen.getByRole('button', { name: 'Click' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('applies fullWidth style when fullWidth is true', () => {
    const { container } = renderWithProviders(
      <PrimaryButton text="Full Width" fullWidth />,
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  it('applies custom styles when provided', () => {
    const { container } = renderWithProviders(
      <PrimaryButton text="Styled" customStyles={{ marginTop: '20px' }} />,
    );

    const button = container.querySelector('button');
    expect(button?.style.marginTop).toBe('20px');
  });
});
