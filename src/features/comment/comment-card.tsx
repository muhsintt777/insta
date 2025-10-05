import styles from './comment-card.module.scss';
import {
  CSSProperties,
  FC,
  memo,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Theme } from '@emotion/react';
import { Menu, MenuItem, PopoverOrigin, SxProps } from '@mui/material';
import { VerticalDotIcon } from 'assets/icons-components/vertical-dot-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { DateUtils } from 'utils/date-utils';

interface CommentCardProps {
  authorName: string;
  authorProfilePic: string | null;
  commentText: string;
  commentedAt: string;
  commentId: string;
  customStyle?: CSSProperties;
  onDelete: () => Promise<void>;
}

export const CommentCardComp: FC<CommentCardProps> = ({
  authorName,
  customStyle,
  commentText,
  commentedAt,
  commentId,
  authorProfilePic,
  onDelete,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(menuAnchorEl);

  const formattedDate = useMemo(() => {
    return DateUtils.formatRelative(DateUtils.dateFromIsoString(commentedAt));
  }, [commentedAt]);

  const handleMenuClick = useCallback(
    (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      setMenuAnchorEl(e.currentTarget);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null);
  }, []);

  const handleDelete = useCallback(async () => {
    await onDelete();
    handleMenuClose();
  }, [handleMenuClose, onDelete]);

  return (
    <div style={customStyle} className={styles.container}>
      <RoundedProfile imageUrl={authorProfilePic} />
      <div className={styles.rightSection}>
        <div className={styles.authorName}>
          <span>{authorName}</span>
          <span className={styles.date}>{formattedDate}</span>
          <PrimaryIconButton onClick={handleMenuClick}>
            <VerticalDotIcon color="var(--clr-grey)" />
          </PrimaryIconButton>
        </div>
        <p className={styles.commentText}>{commentText}</p>
      </div>
      <Menu
        aria-hidden={open ? 'false' : 'true'}
        anchorEl={menuAnchorEl}
        id={`comment-menu-${commentId}`}
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
            sx: commentMenuSx,
          },
        }}
        transformOrigin={commentMenuTransformOrigin}
        anchorOrigin={commentMenuAnchorOrigin}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};
export const CommentCard = memo(CommentCardComp);

const commentMenuSx: SxProps<Theme> = {
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

const commentMenuTransformOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

const commentMenuAnchorOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};
