import styles from './loaderStyle.module.css';
import { FC } from 'react';

interface DotLoaderProps {
  color?: string;
}

export const DotLoader: FC<DotLoaderProps> = ({
  color = 'var(--clr-white)',
}) => {
  return (
    <div
      className={styles.dotLoader}
      style={{ ['--dot-color' as any]: color }}
    />
  );
};
