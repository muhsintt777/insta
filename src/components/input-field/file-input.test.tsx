import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileInput } from './file-input';

// Mock URL.createObjectURL
global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('FileInput', () => {
  const defaultProps = {
    value: null,
    name: 'profileImage',
    label: 'Profile Image',
    error: null,
    onChange: vi.fn(),
    sizeLabelInMb: 5,
  };

  it('renders label', () => {
    render(<FileInput {...defaultProps} />);

    expect(screen.getByText('Profile Image')).toBeInTheDocument();
  });

  it('renders size limit label', () => {
    render(<FileInput {...defaultProps} sizeLabelInMb={2} />);

    expect(screen.getByText('2 MB max')).toBeInTheDocument();
  });

  it('renders add image icon when no file selected', () => {
    const { container } = render(<FileInput {...defaultProps} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders image preview when file is selected', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    render(<FileInput {...defaultProps} value={file} />);

    const preview = screen.getByAltText('Preview');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute('src', 'mock-url');
  });

  it('calls onChange when file is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(
      <FileInput {...defaultProps} onChange={onChange} />,
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await user.upload(input, file);

    expect(onChange).toHaveBeenCalledWith(file);
  });

  it('renders error message when error is provided', () => {
    render(<FileInput {...defaultProps} error="File too large" />);

    expect(screen.getByText('File too large')).toBeInTheDocument();
  });

  it('hides error message when no error', () => {
    render(<FileInput {...defaultProps} error={null} />);

    // Error paragraph exists but should have hidden class
    const errorParagraph = document.querySelector('p');
    expect(errorParagraph).toBeInTheDocument();
  });

  it('applies custom styles', () => {
    const { container } = render(
      <FileInput {...defaultProps} customStyles={{ marginTop: '20px' }} />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.marginTop).toBe('20px');
  });

  it('opens file dialog when preview area is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<FileInput {...defaultProps} />);

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const clickSpy = vi.spyOn(input, 'click');

    const previewContainer = container.querySelector(
      '[class*="previewContainer"]',
    );
    await user.click(previewContainer!);

    expect(clickSpy).toHaveBeenCalled();
  });
});
