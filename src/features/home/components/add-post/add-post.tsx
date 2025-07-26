import styles from './add-postStyle.module.scss';
import { FC, useState, memo } from 'react';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { CreatePostModal } from 'features/posts/create-post-modal';

interface AddPostProps {
  onPostCreated?: () => void;
}

const AddPostComponent: FC<AddPostProps> = ({ onPostCreated }) => {
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

  const toggleCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
  };

  return (
    <div className={styles.container}>
      <RoundedProfile />
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
