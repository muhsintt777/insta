import styles from './add-post.module.scss';
import { FC, useState, memo } from 'react';
import { CustomAvatar } from '@insta/ui/avatars';
import { CreatePostModal } from 'features/posts/forms/create-post-modal';

interface AddPostProps {
  profileImage: string | null;
}

const AddPostComponent: FC<AddPostProps> = ({ profileImage }) => {
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

  const toggleCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
  };

  return (
    <div className={styles.container}>
      <CustomAvatar src={profileImage} />
      <div className={styles.clickableBox} onClick={toggleCreatePostModal}>
        <p>What's on your mind?</p>
      </div>
      {showCreatePostModal && (
        <CreatePostModal
          isOpen={showCreatePostModal}
          closeModal={toggleCreatePostModal}
        />
      )}
    </div>
  );
};

export const AddPost = memo(AddPostComponent);
