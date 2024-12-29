import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.container}>
      <div className="app-container">
        <div className={styles.contentWrap}>
          <div>logo</div>
          <div className={styles.profile}>
            <RoundedProfile />
            <p>John Doe</p>
          </div>
        </div>
      </div>
    </header>
  );
};
