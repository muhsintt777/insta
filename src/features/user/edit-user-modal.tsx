import styles from './edit-user-modal.module.scss';
import {
  ModalFooter,
  ModalHeader,
  PrimaryModal,
} from 'components/modals/primary-modal';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { FC, useState } from 'react';
import { editUser, selectUser } from './user-slice';
import { Controller, useForm } from 'react-hook-form';
import { userEditSchema, UserEditSchema } from './user-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'components/input-field/text-input';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { UserService } from './user-service';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(selectUser).details!;

  const [showLoader, setShowLoader] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: { fullName: userDetails.fullName, bio: userDetails.bio },
  });

  const getChangedFormValues = (formData: UserEditSchema) => {
    const changedValues: Partial<UserEditSchema> = {
      fullName:
        userDetails.fullName !== formData.fullName
          ? formData.fullName
          : undefined,
      bio: userDetails.bio !== formData.bio ? formData.bio : undefined,
    };
    if (Object.values(changedValues).every((value) => value === undefined)) {
      return null;
    }
    return changedValues;
  };

  const handleSave = async (data: UserEditSchema) => {
    try {
      const changedValues = getChangedFormValues(data);
      if (!changedValues) {
        handleClose();
        return;
      }
      setShowLoader(true);
      await UserService.editUserProfile({
        fullName: changedValues.fullName,
        bio: changedValues.bio || undefined,
      });
      dispatch(editUser(changedValues));
      setShowLoader(false);
      handleClose();
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
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextInput
                customStyle={{ marginBottom: '35px', marginTop: '16px' }}
                error={errors.fullName?.message || null}
                name="fullName"
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
