import styles from './profile-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppBar } from 'components/app-bar/app-bar';

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
    </div>
  );
};
