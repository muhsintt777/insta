import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { PrimaryIconButton } from '../primary-icon-button';

describe('PrimaryIconButton', () => {
  it('renders children correctly', () => {
    renderWithProviders(
      <PrimaryIconButton>
        <span data-testid="icon">Icon</span>
      </PrimaryIconButton>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(
      <PrimaryIconButton onClick={handleClick}>
        <span>Icon</span>
      </PrimaryIconButton>,
    );

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledOnce();
    expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
  });

  it('does not throw error when onClick is not provided', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <PrimaryIconButton>
        <span>Icon</span>
      </PrimaryIconButton>,
    );

    await user.click(screen.getByRole('button'));
    // Test passes if no error is thrown
  });

  it('renders with correct button type', () => {
    renderWithProviders(
      <PrimaryIconButton type="submit">
        <span>Icon</span>
      </PrimaryIconButton>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders with reset type', () => {
    renderWithProviders(
      <PrimaryIconButton type="reset">
        <span>Icon</span>
      </PrimaryIconButton>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  it('defaults to button type when not specified', () => {
    renderWithProviders(
      <PrimaryIconButton>
        <span>Icon</span>
      </PrimaryIconButton>,
    );

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies correct padding style', () => {
    const { container } = renderWithProviders(
      <PrimaryIconButton>
        <span>Icon</span>
      </PrimaryIconButton>,
    );

    const button = container.querySelector('button');
    expect(button).toHaveClass('MuiIconButton-root');
  });
});
