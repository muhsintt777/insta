import styles from './secondary-layout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from 'app/components/header/app-header';

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
