import styles from './profile-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppBar } from 'components/app-bar/app-bar';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { addMultipleClassNames } from 'utils/common';

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div
        className={addMultipleClassNames(styles.appBarWrap, 'app-container')}
      >
        <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
      </div>
      <div className={addMultipleClassNames(styles.body, 'app-container')}>
        <div className={styles.userDetailsSection}>
          <RoundedProfile size="100px" />
          <p>sfsefs</p>
        </div>
      </div>
    </div>
  );
};
