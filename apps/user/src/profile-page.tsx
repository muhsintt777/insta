import styles from './profile-page.module.css';
import { useCallback, useRef, useState } from 'react';
import { EditIcon } from '@insta/ui/icons';
import { PrimaryIconButton } from '@insta/ui/buttons';
import { CustomAvatar } from '@insta/ui/avatars';
import { AppBar } from './components/app-bar/app-bar';
import { EditUserModal } from './edit-user-modal';
import { ProfilePosts } from './profile-posts';
import type { User } from './user-types';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { EventBus } from './event-bus';

interface ProfilePageProps {
  user: User;
}

export const ProfilePage = ({ user }: ProfilePageProps) => {
  const [userDetails, setUserDetails] = useState(user);
  const userDetailsRef = useRef(userDetails);
  const [showUserEditModal, setShowUserEditModal] = useState(false);

  const handleUserUpdated = useCallback((updatedUser: User) => {
    userDetailsRef.current = updatedUser;
    setUserDetails(updatedUser);
    EventBus.emit(MFE_EVENT_NAMES.user.updated, updatedUser);
  }, []);

  const handlePostDeleted = useCallback(() => {
    handleUserUpdated({
      ...userDetailsRef.current,
      postCount: userDetailsRef.current.postCount - 1,
    });
  }, [handleUserUpdated]);

  return (
    <div className={styles.container}>
      <AppBar
        title="PROFILE"
        onBackClick={() =>
          EventBus.emit(MFE_EVENT_NAMES.navigation.back, undefined)
        }
      />
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
            <PrimaryIconButton onClick={() => setShowUserEditModal(true)}>
              <EditIcon />
            </PrimaryIconButton>
          </div>
        </div>
        <ProfilePosts onPostDeleted={handlePostDeleted} />
      </div>
      <EditUserModal
        isOpen={showUserEditModal}
        user={userDetails}
        closeModal={() => setShowUserEditModal(false)}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};
