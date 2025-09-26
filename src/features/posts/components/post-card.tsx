import styles from './post-card.module.scss';
import {
  CSSProperties,
  FC,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Menu, MenuItem, PopoverOrigin, SxProps, Theme } from '@mui/material';
import { VerticalDotIcon } from 'assets/icons-components/vertical-dot-icon';
import { LikeIcon } from 'assets/icons-components/like-icon';
import { CommentIcon } from 'assets/icons-components/comment-icon';
// import { ShareIcon } from 'assets/icons-components/share-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { DateUtils } from 'utils/date-utils';
import { SecondaryButton } from 'components/buttons/secondary-button';
import { LikedIcon } from 'assets/icons-components/liked-icon';
import { colors } from 'main/global-style';

interface PostCardProps {
  id: string;
  fullname: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
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
  id,
  image,
  likeCount,
  updatedAt,
  customStyles,
  fullname,
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

  return (
    <article style={customStyles} className={styles.container}>
      <div className={styles.head}>
        <RoundedProfile />
        <div>
          <p>{fullname}</p>
          <p>{date}</p>
        </div>
        {enableOptions && (
          <div className={styles.iconButton}>
            <PrimaryIconButton onClick={handleMenuClick}>
              <VerticalDotIcon color="var(--clr-grey)" />
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
          {isLiked ? <LikedIcon color={colors.PRIMARY} /> : <LikeIcon />}
          <span className={styles.count}>{likeCount + 5}</span>
        </SecondaryButton>
        <SecondaryButton onClick={onComment}>
          <CommentIcon />
          <span className={styles.count}>{commentCount + 2}</span>
        </SecondaryButton>
        {/* <SecondaryButton>
          <ShareIcon />
        </SecondaryButton> */}
      </div>

      <Menu
        aria-hidden={open ? 'false' : 'true'}
        anchorEl={menuAnchorEl}
        id={`post-menu-${id}`}
        open={open}
        onClose={handleMenuClose}
        disableAutoFocus
        disableRestoreFocus
        MenuListProps={{
          onBlur: handleMenuClose,
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: postMenuSx,
          },
        }}
        transformOrigin={postMenuTransformOrigin}
        anchorOrigin={postMenuAnchorOrigin}
      >
        {onEdit && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
        {onDelete && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
      </Menu>
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

const postMenuSx: SxProps<Theme> = {
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

const postMenuTransformOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

const postMenuAnchorOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};
