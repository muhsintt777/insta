import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { screen, renderWithProviders, userEvent, waitFor } from 'test-utils';
import { EditUserModal } from '../edit-user-modal';
import { UserService } from '../user-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

vi.mock('../user-service', () => ({
  UserService: {
    editUserProfile: vi.fn(),
  },
}));

vi.mock('features/toast/handle-error-with-toast', () => ({
  handleErrorWithToast: vi.fn(),
}));

const mockUserDetails = {
  id: 'user-1',
  fullName: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  profileImage: null,
  bio: 'Original bio',
  postCount: 10,
  friendsCount: 5,
};

// Helper to get inputs by name attribute
const getFullnameInput = () =>
  document.querySelector('input[name="fullName"]') as HTMLInputElement;
const getBioInput = () =>
  document.querySelector('input[name="bio"]') as HTMLInputElement;

describe('EditUserModal', () => {
  const defaultProps = {
    isOpen: true,
    closeModal: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with title', () => {
    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });

  it('renders fullname input field', () => {
    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(screen.getByText('Fullname')).toBeInTheDocument();
    expect(getFullnameInput()).toBeInTheDocument();
  });

  it('renders bio input field', () => {
    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(getBioInput()).toBeInTheDocument();
  });

  it('pre-fills form with user details', () => {
    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(getFullnameInput()).toHaveValue('John Doe');
    expect(getBioInput()).toHaveValue('Original bio');
  });

  it('renders SAVE button', () => {
    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(screen.getByRole('button', { name: 'SAVE' })).toBeInTheDocument();
  });

  it('renders CANCEL button', () => {
    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(screen.getByRole('button', { name: 'CANCEL' })).toBeInTheDocument();
  });

  it('calls closeModal when CANCEL is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <EditUserModal isOpen={true} closeModal={closeModal} />,
      {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      },
    );

    await user.click(screen.getByRole('button', { name: 'CANCEL' }));

    expect(closeModal).toHaveBeenCalled();
  });

  it('calls closeModal when close icon is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <EditUserModal isOpen={true} closeModal={closeModal} />,
      {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      },
    );

    // Find the close button (it's the IconButton, not SAVE or CANCEL text buttons)
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find(
      (btn) =>
        !btn.textContent?.includes('SAVE') &&
        !btn.textContent?.includes('CANCEL'),
    );
    await user.click(closeButton!);

    expect(closeModal).toHaveBeenCalled();
  });

  it('saves updated user profile', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();
    (UserService.editUserProfile as Mock).mockResolvedValue({});

    renderWithProviders(
      <EditUserModal isOpen={true} closeModal={closeModal} />,
      {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      },
    );

    const fullnameInput = getFullnameInput();
    await user.clear(fullnameInput);
    await user.type(fullnameInput, 'Jane Doe');

    await user.click(screen.getByRole('button', { name: 'SAVE' }));

    await waitFor(() => {
      expect(UserService.editUserProfile).toHaveBeenCalledWith({
        fullName: 'Jane Doe',
      });
    });

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
    });
  });

  it('closes modal without API call when no changes made', async () => {
    const user = userEvent.setup();
    const closeModal = vi.fn();

    renderWithProviders(
      <EditUserModal isOpen={true} closeModal={closeModal} />,
      {
        preloadedState: {
          user: { status: 'SUCCESS', details: mockUserDetails },
        },
      },
    );

    await user.click(screen.getByRole('button', { name: 'SAVE' }));

    await waitFor(() => {
      expect(closeModal).toHaveBeenCalled();
    });

    expect(UserService.editUserProfile).not.toHaveBeenCalled();
  });

  it('handles error when editUserProfile fails', async () => {
    const user = userEvent.setup();
    const mockError = new Error('Update failed');
    (UserService.editUserProfile as Mock).mockRejectedValue(mockError);

    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    const fullnameInput = getFullnameInput();
    await user.clear(fullnameInput);
    await user.type(fullnameInput, 'Jane Doe');

    await user.click(screen.getByRole('button', { name: 'SAVE' }));

    await waitFor(() => {
      expect(handleErrorWithToast).toHaveBeenCalledWith(mockError);
    });
  });

  it('does not render when isOpen is false', () => {
    renderWithProviders(<EditUserModal isOpen={false} closeModal={vi.fn()} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    expect(screen.queryByText('Edit Profile')).not.toBeInTheDocument();
  });

  it('shows validation error for empty fullname', async () => {
    const user = userEvent.setup();

    renderWithProviders(<EditUserModal {...defaultProps} />, {
      preloadedState: {
        user: { status: 'SUCCESS', details: mockUserDetails },
      },
    });

    const fullnameInput = getFullnameInput();
    await user.clear(fullnameInput);

    await user.click(screen.getByRole('button', { name: 'SAVE' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid fullname')).toBeInTheDocument();
    });
  });
});
