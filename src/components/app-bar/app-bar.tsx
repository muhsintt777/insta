import styles from './app-bar.module.scss';
import { FC } from 'react';
import { BackIcon } from 'assets/icons-components/back-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';

interface AppBarProps {
  title: string;
  onBackClick: () => void;
}

export const AppBar: FC<AppBarProps> = ({ title, onBackClick }) => {
  return (
    <div className={styles.container}>
      <PrimaryIconButton onClick={onBackClick}>
        <div className={styles.iconWrap}>
          <BackIcon size="18px" />
        </div>
      </PrimaryIconButton>
      <p>{title}</p>
    </div>
  );
};
