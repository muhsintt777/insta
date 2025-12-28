import styles from './post-card.module.scss';
import {
  CSSProperties,
  FC,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { VerticalDotIcon } from 'assets/icons-components/vertical-dot-icon';
import { LikeIcon } from 'assets/icons-components/like-icon';
import { CommentIcon } from 'assets/icons-components/comment-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { DateUtils } from 'utils/date-utils';
import { SecondaryButton } from 'components/buttons/secondary-button';
import { LikedIcon } from 'assets/icons-components/liked-icon';
import { CustomMenu } from 'components/menus/custom-menu';

interface PostCardProps {
  fullname: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  userProfileImage: string | null;
  isLiked: boolean;
  createdAt: string;
  customStyles?: CSSProperties;
  onDelete?: () => Promise<void>;
  onEdit?: () => void;
  onLike: () => void;
  onComment: () => void;
}

export const PostCard: FC<PostCardProps> = ({
  caption,
  commentCount,
  createdAt,
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

  const open = Boolean(menuAnchorEl);
  const enableOptions = useMemo(
    () => Boolean(onDelete || onEdit),
    [onDelete, onEdit],
  );
  const date = useMemo(
    () => DateUtils.formatRelative(DateUtils.dateFromIsoString(createdAt)),
    [createdAt],
  );

  const handleMenuClick = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      setMenuAnchorEl(e.currentTarget);
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
    <article style={customStyles} className={styles.container}>
      <div className={styles.head}>
        <RoundedProfile imageUrl={userProfileImage} />
        <div>
          <p>{fullname}</p>
          <p>{date}</p>
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
      <div className={styles.actions}>
        <SecondaryButton onClick={onLike}>
          {isLiked ? <LikedIcon /> : <LikeIcon />}
          <span className={styles.count}>{likeCount}</span>
        </SecondaryButton>
        <SecondaryButton onClick={onComment}>
          <CommentIcon />
          <span className={styles.count}>{commentCount}</span>
        </SecondaryButton>
        {/* <SecondaryButton>
          <ShareIcon />
        </SecondaryButton> */}
      </div>

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
