import styles from './edit-user-modal.module.scss';
import { ModalFooter, ModalHeader, PrimaryModal } from '@insta/ui/modals';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { userEditSchema, UserEditSchema } from './user-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '@insta/ui/input-fields';
import { emitErrorToast } from './emit-error-toast';
import { UserService } from './user-service';
import type { EditUserProfileParams, User } from './user-types';

interface EditUserModalProps {
  isOpen: boolean;
  user: User;
  closeModal: () => void;
  onUserUpdated: (user: User) => void;
}

export const EditUserModal: FC<EditUserModalProps> = ({
  isOpen,
  user,
  closeModal,
  onUserUpdated,
}) => {
  const [showLoader, setShowLoader] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserEditSchema>({
    resolver: zodResolver(userEditSchema),
    defaultValues: { fullName: user.fullName, bio: user.bio },
  });

  const getChangedFormValues = (
    formData: UserEditSchema,
    currentUser: User,
  ) => {
    const changedValues: EditUserProfileParams = {};
    if (formData.fullName !== currentUser.fullName) {
      changedValues.fullName = formData.fullName;
    }
    if (formData.bio !== currentUser.bio) {
      changedValues.bio = formData.bio;
    }
    return Object.keys(changedValues).length === 0 ? null : changedValues;
  };

  const handleSave = async (data: UserEditSchema) => {
    try {
      const changedValues = getChangedFormValues(data, user);
      if (!changedValues) {
        closeModal();
        return;
      }
      setShowLoader(true);
      await UserService.editUserProfile(changedValues);
      onUserUpdated({ ...user, ...changedValues });
      closeModal();
    } catch (error) {
      emitErrorToast(error);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    reset({ fullName: user.fullName, bio: user.bio });
  }, [isOpen, user.fullName, user.bio, reset]);

  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="Edit Profile" onClose={closeModal} />
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
                onchange={field.onChange}
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
            showLoader,
          }}
          secondaryButton={{ text: 'CANCEL', onClick: closeModal }}
        />
      </>
    </PrimaryModal>
  );
};