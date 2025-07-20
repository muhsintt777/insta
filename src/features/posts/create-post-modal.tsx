import { PrimaryModal } from 'components/modal/primary-modal';
import { PrimaryModalHeader } from 'components/modal/primary-modal-header';
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
        <PrimaryModalHeader title="CREATE POST" onClose={closeModal} />
        <div>dgrgrg</div>
      </>
    </PrimaryModal>
  );
};
