import styles from './primary-layoutStyle.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from 'app/components/header/app-header';

export const PrimaryLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.middle}>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
