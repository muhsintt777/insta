import { FormField } from 'components/input-field/form-field';
import {
  PrimaryModal,
  ModalHeader,
  ModalFooter,
} from 'components/modals/primary-modal';
import { FC, useState } from 'react';

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
  const [postForm, setPostForm] = useState({
    caption: '',
    image: null as File | null,
  });

  const handlePostSubmit = () => {
    onSubmit?.();
    closeModal();
  };

  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="CREATE POST" onClose={closeModal} />
        <div style={{ flex: 1, width: '100%', padding: '0px 12px' }}>
          <FormField
            error={null}
            label="Caption"
            name="Caption"
            placeholder="What's on your mind?"
            controls={{
              type: 'TEXT',
              value: postForm.caption,
              onchange: (e) => {
                setPostForm((prev) => ({ ...prev, caption: e }));
              },
            }}
          />

          <FormField
            error={null}
            label="Image"
            name="Image"
            placeholder="Upload an image"
            controls={{
              type: 'IMAGE',
              value: postForm.image,
              onchange: (e) => {
                setPostForm((prev) => ({ ...prev, image: e }));
              },
              sizeLimit: 5 * 1024 * 1024, // 5 MB limit
            }}
          />
        </div>
        <ModalFooter
          secondaryButton={{ onClick: closeModal, text: 'CANCEL' }}
          primaryButton={{ text: 'POST', onClick: handlePostSubmit }}
        />
      </>
    </PrimaryModal>
  );
};
