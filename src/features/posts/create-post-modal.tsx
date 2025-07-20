import { PrimaryModal, ModalHeader } from 'components/modals/primary-modal';
import { PrimaryModalFooter } from 'components/modals/primary-modal-footer';
import { FC } from 'react';

interface CreatePostModalProps {
  closeModal: () => void;
  onSubmit?: () => void;
  isOpen: boolean;
}

export const CreatePostModal: FC<CreatePostModalProps> = ({
  isOpen,
  closeModal,
  onSubmit,
}) => {
  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="CREATE POST" onClose={closeModal} />
        <div style={{ flex: 1, width: '100%' }}>dgrgrg</div>
        <PrimaryModalFooter />
      </>
    </PrimaryModal>
  );
};
