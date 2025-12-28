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
import { VerticalDotIcon } from 'assets/icons-components/vertical-dot-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { CustomMenu } from 'components/menus/custom-menu';
import { DateUtils } from 'utils/date-utils';

interface CommentCardProps {
  authorName: string;
  authorProfilePic: string | null;
  commentText: string;
  commentedAt: string;
  customStyle?: CSSProperties;
  onDelete: () => Promise<void>;
}

export const CommentCardComp: FC<CommentCardProps> = ({
  authorName,
  customStyle,
  commentText,
  commentedAt,
  authorProfilePic,
  onDelete,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

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

  const menuItems = useMemo(
    () => [
      {
        label: 'Delete',
        onClick: handleDelete,
      },
    ],
    [handleDelete],
  );

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
      <CustomMenu
        anchorEl={menuAnchorEl}
        onClose={handleMenuClose}
        items={menuItems}
      />
    </div>
  );
};
export const CommentCard = memo(CommentCardComp);
