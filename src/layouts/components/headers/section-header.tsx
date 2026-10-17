import styles from './section-header.module.scss';
import { CSSProperties, FC } from 'react';

interface SectionHeaderProps {
  title: string;
  style?: CSSProperties;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, style }) => {
  return (
    <div style={style} className={styles.container}>
      <p>{title}</p>
    </div>
  );
};
