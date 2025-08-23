import styles from './post-card.module.scss';
import { CSSProperties, FC } from 'react';
import { VerticalDotIcon } from 'assets/icons-components/vertical-dot-icon';
import { LikeIcon } from 'assets/icons-components/like-icon';
import { CommentIcon } from 'assets/icons-components/comment-icon';
import { ShareIcon } from 'assets/icons-components/share-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';

interface PostCardProps {
  id: string;
  fullname: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  customStyles?: CSSProperties;
}

export const PostCard: FC<PostCardProps> = ({
  caption,
  commentCount,
  createdAt,
  id,
  image,
  likeCount,
  updatedAt,
  customStyles,
  fullname,
}) => {
  return (
    <article style={customStyles} className={styles.container}>
      <div className={styles.head}>
        <RoundedProfile />
        <div>
          <p>{fullname}</p>
          <p>5 mins ago</p>
        </div>
        <div className={styles.iconButton}>
          <PrimaryIconButton onClick={() => console.log('icon-button')}>
            <VerticalDotIcon color="var(--clr-grey)" />
          </PrimaryIconButton>
        </div>
      </div>
      <div className={styles.content}>
        <p>{caption}</p>
        <img src={image} alt="img" />
      </div>
      <div className={styles.actions}>
        <LikeIcon />
        <CommentIcon />
        <ShareIcon />
      </div>
    </article>
  );
};

export const PostCardSkeleton: FC = () => (
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
