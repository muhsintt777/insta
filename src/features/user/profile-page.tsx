import styles from './profile-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import { AppBar } from 'components/app-bar/app-bar';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { addMultipleClassNames } from 'utils/common';
import { selectUser } from './user-slice';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const userDetails = useAppSelector(selectUser).details;

  return (
    userDetails && (
      <div className={styles.container}>
        <div
          className={addMultipleClassNames(styles.appBarWrap, 'app-container')}
        >
          <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
        </div>
        <div className={addMultipleClassNames(styles.body, 'app-container')}>
          <div className={styles.userDetailsSection}>
            <RoundedProfile size="100px" />
            <div className={styles.userDetails}>
              <p className={styles.name}>{userDetails.fullName}</p>
              <p className={styles.stats}>0 posts | 0 friends</p>
              {userDetails.bio && (
                <p className={styles.bio}>{userDetails.bio}</p>
              )}
              {!userDetails.bio && <p className={styles.addBio}>Add bio...</p>}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
