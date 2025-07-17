import styles from './postStyle.module.scss';
import { FC } from 'react';

export const PostSkeleton: FC = () => (
  <article
    className={styles.container}
    aria-busy="true"
    aria-label="Loading post"
  >
    <div className={styles.head}>
      <div className={styles.skeletonProfile} />
      <div className={styles.skeletonTextGroup}>
        <div
          className={styles.skeletonText}
          style={{ width: '80px', height: '14px' }}
        />
        <div
          className={styles.skeletonText}
          style={{ width: '50px', height: '12px', marginTop: 4 }}
        />
      </div>
      <div className={styles.skeletonIconButton} />
    </div>
    <div className={styles.content}>
      <div
        className={styles.skeletonText}
        style={{ width: '100%', height: '16px', marginBottom: 8 }}
      />
      <div className={styles.skeletonImage} />
    </div>
    <div className={styles.actions}>
      <div className={styles.skeletonActionIcon} />
      <div className={styles.skeletonActionIcon} />
      <div className={styles.skeletonActionIcon} />
    </div>
  </article>
);
