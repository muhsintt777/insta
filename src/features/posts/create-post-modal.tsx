import { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField } from 'components/input-field/form-field';
import {
  PrimaryModal,
  ModalHeader,
  ModalFooter,
} from 'components/modals/primary-modal';
import { FileInput } from 'components/input-field/file-input';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { PostService } from './post-service';
import { PostFormSchema, postFormSchema } from './post-validation';

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
  const [showPostLoader, setShowPostLoader] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
  });

  const handlePostSubmit = async (data: PostFormSchema) => {
    try {
      setShowPostLoader(true);
      await PostService.createPost(data as any);
      onSubmit?.();
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
        <ModalHeader title="CREATE POST" onClose={closeModal} />
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

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileInput
                error={errors.image?.message || null}
                label="Image"
                name="image"
                sizeLabelInMb={2}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </form>
        <ModalFooter
          secondaryButton={{ onClick: closeModal, text: 'CANCEL' }}
          primaryButton={{
            text: 'POST',
            showLoader: showPostLoader,
            onClick: handleSubmit(handlePostSubmit),
          }}
        />
      </>
    </PrimaryModal>
  );
};
