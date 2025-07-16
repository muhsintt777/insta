import styles from './secondary-layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/headers/app-header';

export const SecondaryLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
