import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from './form-field';

// Mock URL.createObjectURL for image preview
global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('FormField', () => {
  describe('TEXT type', () => {
    const textProps = {
      placeholder: 'Enter name',
      label: 'Name',
      name: 'name',
      error: null,
      controls: {
        type: 'TEXT' as const,
        value: '',
        onchange: vi.fn(),
      },
    };

    it('renders label and input', () => {
      render(<FormField {...textProps} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(
        <FormField
          {...textProps}
          controls={{ ...textProps.controls, value: 'John' }}
        />,
      );

      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });

    it('calls onchange when typing', async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();
      render(
        <FormField
          {...textProps}
          controls={{ ...textProps.controls, onchange }}
        />,
      );

      const input = screen.getByPlaceholderText('Enter name');
      await user.type(input, 'a');

      expect(onchange).toHaveBeenCalledWith('a');
    });

    it('shows error message', () => {
      render(<FormField {...textProps} error="Name is required" />);

      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });

    it('applies custom styles', () => {
      const { container } = render(
        <FormField {...textProps} customStyles={{ width: '300px' }} />,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.width).toBe('300px');
    });
  });

  describe('PASSWORD type', () => {
    const passwordProps = {
      placeholder: 'Enter password',
      label: 'Password',
      name: 'password',
      error: null,
      controls: {
        type: 'PASSWORD' as const,
        value: '',
        onchange: vi.fn(),
      },
    };

    it('renders password input', () => {
      const { container } = render(<FormField {...passwordProps} />);

      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('calls onchange when typing', async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();
      render(
        <FormField
          {...passwordProps}
          controls={{ ...passwordProps.controls, onchange }}
        />,
      );

      const input = screen.getByPlaceholderText('Enter password');
      await user.type(input, 'x');

      expect(onchange).toHaveBeenCalledWith('x');
    });

    it('shows error message', () => {
      render(<FormField {...passwordProps} error="Password too weak" />);

      expect(screen.getByText('Password too weak')).toBeInTheDocument();
    });
  });

  describe('NUMBER type', () => {
    const numberProps = {
      placeholder: 'Enter age',
      label: 'Age',
      name: 'age',
      error: null,
      controls: {
        type: 'NUMBER' as const,
        value: 0,
        onchange: vi.fn(),
      },
    };

    it('renders number input', () => {
      const { container } = render(<FormField {...numberProps} />);

      const input = container.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(
        <FormField
          {...numberProps}
          controls={{ ...numberProps.controls, value: 25 }}
        />,
      );

      expect(screen.getByDisplayValue('25')).toBeInTheDocument();
    });

    it('calls onchange with number value', async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();
      render(
        <FormField
          {...numberProps}
          controls={{ ...numberProps.controls, onchange }}
        />,
      );

      const input = screen.getByPlaceholderText('Enter age');
      await user.type(input, '5');

      // onchange is called with the parsed number
      expect(onchange).toHaveBeenCalledWith(5);
    });
  });

  describe('IMAGE type', () => {
    const imageProps = {
      placeholder: 'Select image',
      label: 'Image',
      name: 'image',
      error: null,
      controls: {
        type: 'IMAGE' as const,
        value: null,
        onchange: vi.fn(),
      },
    };

    it('renders file input', () => {
      const { container } = render(<FormField {...imageProps} />);

      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('calls onchange when file is selected', async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();
      const { container } = render(
        <FormField
          {...imageProps}
          controls={{ ...imageProps.controls, onchange }}
        />,
      );

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

      await user.upload(input, file);

      expect(onchange).toHaveBeenCalledWith(file);
    });

    it('shows image preview when file is selected', () => {
      const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      render(
        <FormField
          {...imageProps}
          controls={{ ...imageProps.controls, value: file }}
        />,
      );

      const preview = screen.getByAltText('Preview');
      expect(preview).toBeInTheDocument();
    });

    it('shows size limit info when sizeLimit is provided', () => {
      render(
        <FormField
          {...imageProps}
          controls={{ ...imageProps.controls, sizeLimit: 2048 }}
        />,
      );

      expect(screen.getByText('Max size: 2 KB')).toBeInTheDocument();
    });

    it('calls onchange with null when file exceeds size limit', async () => {
      const user = userEvent.setup();
      const onchange = vi.fn();
      const { container } = render(
        <FormField
          {...imageProps}
          controls={{ ...imageProps.controls, onchange, sizeLimit: 10 }}
        />,
      );

      const input = container.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      const largeFile = new File(['test content here'], 'large.jpg', {
        type: 'image/jpeg',
      });

      await user.upload(input, largeFile);

      expect(onchange).toHaveBeenCalledWith(null);
    });
  });
});
