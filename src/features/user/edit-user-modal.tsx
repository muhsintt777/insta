import styles from './edit-user-modal.module.scss';
import {
  ModalFooter,
  ModalHeader,
  PrimaryModal,
} from 'components/modals/primary-modal';
import { useAppSelector } from 'hooks/redux-hooks';
import { FC, useState } from 'react';
import { selectUser } from './user-slice';
import { Controller, useForm } from 'react-hook-form';
import { userEditSchema, UserEditSchema } from './user-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'components/input-field/text-input';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const userDetails = useAppSelector(selectUser).details!;

  const [showLoader, setShowLoader] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: { fullname: userDetails.fullName, bio: userDetails.bio },
  });

  const handleSave = async (data: UserEditSchema) => {
    try {
      if (
        data.fullname === userDetails.fullName &&
        data.bio === userDetails.bio
      ) {
        handleClose();
        return;
      }
      setShowLoader(true);
      // console.log('dd', data);
      handleClose();
      setShowLoader(false);
    } catch (error) {
      handleErrorWithToast(error);
      setShowLoader(false);
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="Edit Profile" onClose={handleClose} />
        <div className={styles.body}>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <TextInput
                customStyle={{ marginBottom: '35px', marginTop: '16px' }}
                error={errors.fullname?.message || null}
                name="fullname"
                onchange={field.onChange}
                value={field.value}
                label="Fullname"
              />
            )}
          />
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <TextInput
                error={errors.bio?.message || null}
                name="bio"
                onchange={(e) => field.onChange(e || null)}
                value={field.value}
                label="Bio"
              />
            )}
          />
        </div>
        <ModalFooter
          primaryButton={{
            text: 'SAVE',
            onClick: handleSubmit(handleSave),
            showLoader: showLoader,
          }}
          secondaryButton={{ text: 'CANCEL', onClick: handleClose }}
        />
      </>
    </PrimaryModal>
  );
};
