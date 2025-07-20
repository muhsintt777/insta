import {
  PrimaryModal,
  ModalHeader,
  ModalFooter,
} from 'components/modals/primary-modal';
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
        <ModalFooter />
      </>
    </PrimaryModal>
  );
};
