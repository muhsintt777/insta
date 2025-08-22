import styles from './app-bar.module.scss';
import { CSSProperties, FC } from 'react';
import { BackIcon } from 'assets/icons-components/back-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';

interface AppBarProps {
  title: string;
  onBackClick: () => void;
  customStyles?: CSSProperties;
}

export const AppBar: FC<AppBarProps> = ({
  title,
  onBackClick,
  customStyles,
}) => {
  return (
    <div style={customStyles} className={styles.container}>
      <PrimaryIconButton onClick={onBackClick}>
        <div className={styles.iconWrap}>
          <BackIcon size="18px" />
        </div>
      </PrimaryIconButton>
      <p>{title}</p>
    </div>
  );
};
