import { memo, type FC } from 'react';
import styles from './auth-header.module.scss';

interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: FC<AuthHeaderProps> = memo(({ title }) => (
  <div className={styles.container}>
    <h1>{title}</h1>
  </div>
));
