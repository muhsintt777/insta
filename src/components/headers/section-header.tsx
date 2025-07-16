import styles from './section-header.module.scss';
import { FC } from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
    </div>
  );
};
