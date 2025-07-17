import styles from './postStyle.module.scss';
import { FC } from 'react';
import { VerticalDotIcon } from 'assets/icons-components/vertical-dot-icon';
import { LikeIcon } from 'assets/icons-components/like-icon';
import { CommentIcon } from 'assets/icons-components/comment-icon';
import { ShareIcon } from 'assets/icons-components/share-icon';
import { PrimaryIconButton } from 'components/primary-icon-button/primary-icon-button';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';

interface PostProps {
  id: string;
  fullname: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export const Post: FC<PostProps> = ({
  caption,
  commentCount,
  createdAt,
  id,
  image,
  likeCount,
  updatedAt,
  fullname,
}) => {
  return (
    <article className={styles.container}>
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
