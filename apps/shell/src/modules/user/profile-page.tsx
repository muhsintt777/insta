import styles from './profile-page.module.scss';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'app/hooks/redux-hooks';
import { EditIcon } from '@insta/ui/icons';
import { AppBar } from './components/app-bar/app-bar';
import { PrimaryIconButton } from '@insta/ui/buttons';
import { CustomAvatar } from '@insta/ui/avatars';
import { selectUser } from './user-slice';
import { EditUserModal } from './edit-user-modal';
import { ProfilePosts } from './profile-posts';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const userDetails = useAppSelector(selectUser).details!;

  const [showUserEditModal, setShowUserEditModal] = useState(false);

  const toggleUserEditModal = useCallback(() => {
    setShowUserEditModal((prev) => !prev);
  }, []);

  return (
    <div className={styles.container}>
      <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
      <div className={styles.body}>
        <div className={styles.userDetailsSection}>
          <CustomAvatar src={userDetails.profileImage} size="100px" />
          <div className={styles.userDetails}>
            <p className={styles.name}>{userDetails.fullName}</p>
            <p className={styles.stats}>
              {userDetails.postCount} posts | {userDetails.friendsCount} friends
            </p>
            {userDetails.bio && <p className={styles.bio}>{userDetails.bio}</p>}
            {!userDetails.bio && <p className={styles.addBio}>Add bio...</p>}
          </div>
          <div className={styles.editIconWrap}>
            <PrimaryIconButton onClick={toggleUserEditModal}>
              <EditIcon />
            </PrimaryIconButton>
          </div>
        </div>

        <ProfilePosts />
      </div>
      <EditUserModal
        isOpen={showUserEditModal}
        closeModal={toggleUserEditModal}
      />
    </div>
  );
};
