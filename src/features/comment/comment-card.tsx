import styles from './comment-card.module.scss';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { CSSProperties, FC, useCallback, useMemo } from 'react';
import { DateUtils } from 'utils/date-utils';

interface CommentCardProps {
  authorName: string;
  authorProfilePic: string | null;
  commentText: string;
  commentedAt: string;
  customStyle?: CSSProperties;
}

export const CommentCard: FC<CommentCardProps> = ({
  authorName,
  customStyle,
  commentText,
  commentedAt,
}) => {
  const formattedDate = useMemo(() => {
    return DateUtils.formatRelative(DateUtils.dateFromIsoString(commentedAt));
  }, [commentedAt]);

  return (
    <div style={customStyle} className={styles.container}>
      <RoundedProfile />
      <div className={styles.rightSection}>
        <div className={styles.authorName}>
          <span>{authorName} efsfe</span>
          <span>{formattedDate}</span>
        </div>
        <p className={styles.commentText}>{commentText}</p>
      </div>
    </div>
  );
};
