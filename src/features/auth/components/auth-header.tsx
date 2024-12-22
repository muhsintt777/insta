import { FC, memo } from 'react';
import styles from './auth-header.module.scss';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: FC<AuthHeaderProps> = memo(({ title }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
    </div>
  );
});
