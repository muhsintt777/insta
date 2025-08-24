import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from 'components/input-field/form-field';
import {
  PrimaryModal,
  ModalHeader,
  ModalFooter,
} from 'components/modals/primary-modal';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { EditPostFormSchema, editPostFormSchema } from './post-validation';

interface EditPostModalProps {
  closeModal: () => void;
  onSubmit?: (params: EditPostParams) => Promise<void>;
  isOpen: boolean;
  postId: string;
  currentCaption: string;
}

export const EditPostModal: FC<EditPostModalProps> = ({
  isOpen,
  closeModal,
  onSubmit,
  postId,
  currentCaption,
}) => {
  const [showPostLoader, setShowPostLoader] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<EditPostFormSchema>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      caption: currentCaption,
    },
  });

  const handlePostSubmit = async (data: EditPostFormSchema) => {
    try {
      setShowPostLoader(true);
      await onSubmit?.({ postId, caption: data.caption });
      reset();
      closeModal();
    } catch (error) {
      handleErrorWithToast(error);
    } finally {
      setShowPostLoader(false);
    }
  };

  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="EDIT POST" onClose={closeModal} />
        <form
          onSubmit={handleSubmit(handlePostSubmit)}
          style={{
            flex: 1,
            width: '100%',
            padding: '0px 12px',
            overflowY: 'auto',
          }}
        >
          <Controller
            name="caption"
            control={control}
            render={({ field }) => (
              <FormField
                error={errors.caption?.message || null}
                label="Caption"
                name="caption"
                placeholder="What's on your mind?"
                controls={{
                  type: 'TEXT',
                  value: field.value,
                  onchange: field.onChange,
                }}
              />
            )}
          />
        </form>
        <ModalFooter
          secondaryButton={{ onClick: closeModal, text: 'CANCEL' }}
          primaryButton={{
            text: 'UPDATE',
            showLoader: showPostLoader,
            onClick: handleSubmit(handlePostSubmit),
          }}
        />
      </>
    </PrimaryModal>
  );
};
