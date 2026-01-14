import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, renderWithProviders, userEvent } from 'test-utils';
import { WheatherModal } from './wheather-modal';

describe('WheatherModal', () => {
  const defaultProps = {
    isOpen: true,
    closeModal: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal when open', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('Weather Information')).toBeInTheDocument();
  });

  it('does not render content when closed', () => {
    renderWithProviders(<WheatherModal isOpen={false} closeModal={vi.fn()} />);

    expect(screen.queryByText('Weather Information')).not.toBeInTheDocument();
  });

  it('displays weather condition', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
  });

  it('displays location', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('Bay Area, San Francisco')).toBeInTheDocument();
  });

  it('displays temperature', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('18.3')).toBeInTheDocument();
  });

  it('displays min and max temperatures', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText(/14\.0°/)).toBeInTheDocument();
    expect(screen.getByText(/20\.0°/)).toBeInTheDocument();
  });

  it('displays humidity stat', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('74%')).toBeInTheDocument();
  });

  it('displays rainfall stat', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('Rainfall')).toBeInTheDocument();
    expect(screen.getByText('0 mm')).toBeInTheDocument();
  });

  it('displays gusture stat', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(screen.getByText('Gusture')).toBeInTheDocument();
    expect(screen.getByText('3 km/h')).toBeInTheDocument();
  });

  it('displays Today Forecast button', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: 'Today Forecast' }),
    ).toBeInTheDocument();
  });

  it('calls closeModal when Close button is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <WheatherModal isOpen={true} closeModal={closeModal} />,
    );

    await user.click(screen.getByRole('button', { name: 'Close' }));

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it('calls closeModal when header close icon is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <WheatherModal isOpen={true} closeModal={closeModal} />,
    );

    const closeButtons = screen.getAllByRole('button');
    const headerCloseButton = closeButtons[0]; // First button is the header close

    await user.click(headerCloseButton);

    expect(closeModal).toHaveBeenCalledOnce();
  });

  it('renders weather icon', () => {
    renderWithProviders(<WheatherModal {...defaultProps} />);

    const weatherIconContainer = document.querySelector('svg');
    expect(weatherIconContainer).toBeInTheDocument();
  });
});
