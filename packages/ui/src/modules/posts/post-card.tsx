import styles from './post-card.module.scss';
import { useCallback, useMemo, useState } from 'react';
import type { CSSProperties, FC, MouseEvent } from 'react';
import { CommentIcon, LikeIcon, LikedIcon, VerticalDotIcon } from '../../icons';
import { PrimaryIconButton, SecondaryButton } from '../buttons';
import { CustomAvatar } from '../avatar';
import { CustomMenu } from '../menu';

export interface PostCardProps {
  id?: string;
  fullname: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  userProfileImage: string | null;
  isLiked: boolean;
  dateLabel: string;
  customStyles?: CSSProperties;
  onDelete?: () => Promise<void>;
  onEdit?: () => void;
  onLike?: () => void;
  onComment?: () => void;
}

export const PostCard: FC<PostCardProps> = ({
  id,
  caption,
  commentCount,
  dateLabel,
  image,
  likeCount,
  customStyles,
  fullname,
  userProfileImage,
  isLiked,
  onDelete,
  onEdit,
  onComment,
  onLike,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const enableOptions = useMemo(
    () => Boolean(onDelete || onEdit),
    [onDelete, onEdit],
  );
  const handleMenuClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      setMenuAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);

  const handleEdit = useCallback(() => {
    onEdit?.();
    handleMenuClose();
  }, [onEdit, handleMenuClose]);

  const handleDelete = useCallback(async () => {
    await onDelete?.();
    handleMenuClose();
  }, [handleMenuClose, onDelete]);

  const menuItems = useMemo(() => {
    const items = [];
    if (onEdit) {
      items.push({
        label: 'Edit',
        onClick: handleEdit,
      });
    }
    if (onDelete) {
      items.push({
        label: 'Delete',
        onClick: handleDelete,
      });
    }
    return items;
  }, [handleDelete, handleEdit, onDelete, onEdit]);

  return (
    <article id={id} style={customStyles} className={styles.container}>
      <div className={styles.head}>
        <CustomAvatar src={userProfileImage} />
        <div>
          <p>{fullname}</p>
          <p>{dateLabel}</p>
        </div>
        {enableOptions && (
          <div className={styles.iconButton}>
            <PrimaryIconButton onClick={handleMenuClick}>
              <VerticalDotIcon />
            </PrimaryIconButton>
          </div>
        )}
      </div>
      <div className={styles.content}>
        <p>{caption}</p>
        <img src={image} alt="img" />
      </div>
      {(onLike || onComment) && (
        <div className={styles.actions}>
          {onLike && (
            <SecondaryButton onClick={onLike}>
              {isLiked ? <LikedIcon /> : <LikeIcon />}
              <span className={styles.count}>{likeCount}</span>
            </SecondaryButton>
          )}
          {onComment && (
            <SecondaryButton onClick={onComment}>
              <CommentIcon />
              <span className={styles.count}>{commentCount}</span>
            </SecondaryButton>
          )}
        </div>
      )}

      <CustomMenu
        anchorEl={menuAnchorEl}
        onClose={handleMenuClose}
        items={menuItems}
      />
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
