import styles from './add-postStyle.module.scss';
import { FC, useState, memo } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import { CustomAvatar } from 'shared/components/custom-avatar/custom-avatar';
import { CreatePostModal } from 'modules/posts';
import { selectUser, userActions } from 'modules/user';

interface AddPostProps {
  onPostCreated?: () => void;
}

const AddPostComponent: FC<AddPostProps> = ({ onPostCreated }) => {
  const userDetails = useAppSelector(selectUser).details!;
  const dispatch = useAppDispatch();

  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

  const toggleCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
  };

  const handlePostCreated = () => {
    dispatch(
      userActions.updateUserResourceCount({
        type: 'increment',
        key: 'postCount',
      }),
    );
    onPostCreated?.();
  };

  return (
    <div className={styles.container}>
      <CustomAvatar src={userDetails.profileImage} />
      <div className={styles.clickableBox} onClick={toggleCreatePostModal}>
        <p>What's on your mind?</p>
      </div>
      {showCreatePostModal && (
        <CreatePostModal
          isOpen={showCreatePostModal}
          closeModal={toggleCreatePostModal}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

export const AddPost = memo(AddPostComponent);
