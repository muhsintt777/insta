import styles from './add-postStyle.module.scss';
import { FC, useState, memo } from 'react';
import { useAppSelector } from 'hooks/redux-hooks';
import { CustomAvatar } from 'components/custom-avatar/custom-avatar';
import { CreatePostModal } from 'features/posts/create-post-modal';
import { selectUser } from 'features/user/user-slice';

interface AddPostProps {
  onPostCreated?: () => void;
}

const AddPostComponent: FC<AddPostProps> = ({ onPostCreated }) => {
  const userDetails = useAppSelector(selectUser).details!;

  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

  const toggleCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
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
          onSubmit={onPostCreated}
        />
      )}
    </div>
  );
};

export const AddPost = memo(AddPostComponent);
