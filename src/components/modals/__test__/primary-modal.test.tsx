import { describe, it, expect, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { PrimaryModal, ModalHeader, ModalFooter } from '../primary-modal';

describe('PrimaryModal', () => {
  it('renders children when open', () => {
    renderWithProviders(
      <PrimaryModal isOpen={true}>
        <div>Modal Content</div>
      </PrimaryModal>,
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render children when closed', () => {
    renderWithProviders(
      <PrimaryModal isOpen={false}>
        <div>Modal Content</div>
      </PrimaryModal>,
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls closeModal when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithProviders(
      <PrimaryModal isOpen={true} closeModal={handleClose}>
        <div>Modal Content</div>
      </PrimaryModal>,
    );

    // Click on the backdrop (MUI Modal)
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) {
      await user.click(backdrop);
      expect(handleClose).toHaveBeenCalled();
    }
  });
});

describe('ModalHeader', () => {
  it('renders title correctly', () => {
    renderWithProviders(<ModalHeader title="Test Title" onClose={vi.fn()} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithProviders(<ModalHeader title="Title" onClose={handleClose} />);

    await user.click(screen.getByRole('button'));

    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('renders close icon button', () => {
    renderWithProviders(<ModalHeader title="Title" onClose={vi.fn()} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('ModalFooter', () => {
  it('renders primary button when provided', () => {
    renderWithProviders(
      <ModalFooter primaryButton={{ text: 'Submit', onClick: vi.fn() }} />,
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders secondary button when provided', () => {
    renderWithProviders(
      <ModalFooter secondaryButton={{ text: 'Cancel', onClick: vi.fn() }} />,
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('renders both buttons when provided', () => {
    renderWithProviders(
      <ModalFooter
        primaryButton={{ text: 'Submit', onClick: vi.fn() }}
        secondaryButton={{ text: 'Cancel', onClick: vi.fn() }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls primary button onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(
      <ModalFooter primaryButton={{ text: 'Submit', onClick: handleClick }} />,
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('calls secondary button onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithProviders(
      <ModalFooter
        secondaryButton={{ text: 'Cancel', onClick: handleClick }}
      />,
    );

    await user.click(screen.getByText('Cancel'));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows loader on primary button when showLoader is true', () => {
    renderWithProviders(
      <ModalFooter
        primaryButton={{ text: 'Submit', showLoader: true, onClick: vi.fn() }}
      />,
    );

    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it('renders nothing when no buttons are provided', () => {
    const { container } = renderWithProviders(<ModalFooter />);

    const footer = container.firstChild as HTMLElement;
    expect(footer.children).toHaveLength(0);
  });
});
