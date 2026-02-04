import styles from './primary-layoutStyle.module.scss';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/headers/app-header';
import { WheatherActionButton } from 'features/wheather/wheather-action-button';
import { CSSProperties } from 'react';
// import { SideNav } from 'components/side-nav/side-nav';

export const PrimaryLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.middle}>
        {/* <div className={styles.nav}><SideNav /></div> */}
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
      <WheatherActionButton customStyles={WheatherActionButtonStyles} />
    </div>
  );
};

const WheatherActionButtonStyles: CSSProperties = {
  position: 'fixed',
  zIndex: 100,
  bottom: '40px',
  left: '70px',
};
