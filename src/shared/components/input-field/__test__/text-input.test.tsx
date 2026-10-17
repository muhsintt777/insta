import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { TextInput } from '../text-input';

describe('TextInput', () => {
  it('renders input with value', () => {
    renderWithProviders(
      <TextInput
        value="test value"
        name="username"
        error={null}
        onchange={vi.fn()}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('renders label when provided', () => {
    renderWithProviders(
      <TextInput
        value=""
        name="email"
        label="Email Address"
        error={null}
        onchange={vi.fn()}
      />,
    );

    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('does not render label when not provided', () => {
    const { container } = renderWithProviders(
      <TextInput value="" name="field" error={null} onchange={vi.fn()} />,
    );

    expect(container.querySelector('label')).not.toBeInTheDocument();
  });

  it('renders placeholder when provided', () => {
    renderWithProviders(
      <TextInput
        value=""
        name="search"
        placeholder="Search..."
        error={null}
        onchange={vi.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('calls onchange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    renderWithProviders(
      <TextInput value="" name="input" error={null} onchange={handleChange} />,
    );

    await user.type(screen.getByRole('textbox'), 'hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveBeenLastCalledWith('o');
  });

  it('displays error message when error is provided', () => {
    renderWithProviders(
      <TextInput
        value=""
        name="field"
        error="This field is required"
        onchange={vi.fn()}
      />,
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('handles null value correctly', () => {
    renderWithProviders(
      <TextInput value={null} name="field" error={null} onchange={vi.fn()} />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('applies custom styles when provided', () => {
    const { container } = renderWithProviders(
      <TextInput
        value=""
        name="field"
        error={null}
        onchange={vi.fn()}
        customStyle={{ marginTop: '10px' }}
      />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.marginTop).toBe('10px');
  });
});
