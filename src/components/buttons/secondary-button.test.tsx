import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { SecondaryButton } from './secondary-button';

describe('SecondaryButton', () => {
  it('renders children correctly', () => {
    renderWithProviders(<SecondaryButton>Click Me</SecondaryButton>);

    expect(
      screen.getByRole('button', { name: 'Click Me' }),
    ).toBeInTheDocument();
  });

  it('renders with ReactNode children', () => {
    renderWithProviders(
      <SecondaryButton>
        <span data-testid="child-element">Custom Content</span>
      </SecondaryButton>,
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(
      <SecondaryButton onClick={handleClick}>Submit</SecondaryButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithProviders(
      <SecondaryButton disabled onClick={vi.fn()}>
        Disabled
      </SecondaryButton>,
    );

    expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
  });

  it('shows loader when showLoader is true', () => {
    renderWithProviders(<SecondaryButton showLoader>Submit</SecondaryButton>);

    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('renders with correct button type', () => {
    renderWithProviders(
      <SecondaryButton type="submit">Submit</SecondaryButton>,
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it('renders with reset type', () => {
    renderWithProviders(<SecondaryButton type="reset">Reset</SecondaryButton>);

    expect(screen.getByRole('button', { name: 'Reset' })).toHaveAttribute(
      'type',
      'reset',
    );
  });

  it('defaults to button type when not specified', () => {
    renderWithProviders(<SecondaryButton>Click</SecondaryButton>);

    expect(screen.getByRole('button', { name: 'Click' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('applies fullWidth style when fullWidth is true', () => {
    const { container } = renderWithProviders(
      <SecondaryButton fullWidth>Full Width</SecondaryButton>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  it('does not apply fullWidth class by default', () => {
    const { container } = renderWithProviders(
      <SecondaryButton>Normal Width</SecondaryButton>,
    );

    const button = container.querySelector('button');
    expect(button).not.toHaveClass('MuiButton-fullWidth');
  });
});
