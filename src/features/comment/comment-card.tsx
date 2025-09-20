import styles from './comment-card.module.scss';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { CSSProperties, FC } from 'react';

interface CommentCardProps {
  authorName: string;
  authorProfilePic: string;
  commentText: string;
  commentedAt: string;
  customStyle?: CSSProperties;
}

export const CommentCard: FC<CommentCardProps> = ({
  authorName,
  customStyle,
}) => {
  return (
    <div style={customStyle} className={styles.container}>
      <RoundedProfile />
      <div className={styles.rightSection}>
        <div className={styles.authorName}>
          <span>{authorName} efsfe</span>
          <span>2h</span>
        </div>
        <p className={styles.commentText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
          atque aspernatur harum perferendis delectus obcaecati a. Ipsa delectus
          nulla quae pariatur doloribus, velit, ducimus provident dolore nihil,
          eligendi numquam illo!
        </p>
      </div>
    </div>
  );
};
