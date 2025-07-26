import styles from './add-postStyle.module.scss';
import { useState } from 'react';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { CreatePostModal } from 'features/posts/create-post-modal';

export const AddPost = () => {
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);

  const toggleCreatePostModal = () => {
    setShowCreatePostModal(!showCreatePostModal);
  };

  return (
    <div className={styles.container}>
      <RoundedProfile />
      <div>
        <div></div>
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
