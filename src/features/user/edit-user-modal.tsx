import styles from './edit-user-modal.module.scss';
import {
  ModalFooter,
  ModalHeader,
  PrimaryModal,
} from 'components/modals/primary-modal';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { FC, useEffect, useState } from 'react';
import { editUser, selectUser } from './user-slice';
import { Controller, useForm } from 'react-hook-form';
import { userEditSchema, UserEditSchema } from './user-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'components/input-field/text-input';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { UserService } from './user-service';
import { User } from './user';

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

  const getChangedFormValues = (
    formData: UserEditSchema,
    currentUserDetails: User,
  ) => {
    const changedValues: any = {};
    if (formData.fullName !== currentUserDetails.fullName) {
      changedValues.fullName = formData.fullName;
    }
    if (formData.bio !== currentUserDetails.bio) {
      changedValues.bio = formData.bio;
    }
    if (Object.keys(changedValues).length === 0) {
      return null;
    }
    return changedValues as Partial<User>;
  };

  const handleSave = async (data: UserEditSchema) => {
    try {
      const changedValues = getChangedFormValues(data, userDetails);
      if (!changedValues) {
        closeModal();
        return;
      }
      setShowLoader(true);
      await UserService.editUserProfile(changedValues);
      dispatch(editUser(changedValues));
      setShowLoader(false);
      closeModal();
    } catch (error) {
      handleErrorWithToast(error);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    reset({ fullName: userDetails.fullName, bio: userDetails.bio });
  }, [isOpen, userDetails.fullName, userDetails.bio, reset]);

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
            showLoader: showLoader,
          }}
          secondaryButton={{ text: 'CANCEL', onClick: closeModal }}
        />
      </>
    </PrimaryModal>
  );
};
