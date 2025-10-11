import styles from './app-header.module.scss';
import {
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Menu,
  MenuItem,
  PopoverOrigin,
  SxProps,
  Theme,
} from '@mui/material';
import { APP_ROUTES } from 'configs/app-routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { selectUser, userActions } from 'features/user/user-slice';
import { AuthService } from 'features/auth/auth-service';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import appLogo from 'assets/images/app-logo.svg';

export const Header = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Handle focus management reactively when menu closes
  useEffect(() => {
    if (!open && menuRef.current) {
      const focusedElement = menuRef.current.querySelector(':focus');
      if (focusedElement && focusedElement instanceof HTMLElement) {
        focusedElement.blur();
      }
    }
  }, [open]);

  const onProfileClick = useCallback(() => {
    handleClose();
    if (pathname === APP_ROUTES.PROFILE) return;
    navigate(APP_ROUTES.PROFILE);
  }, [handleClose, navigate, pathname]);

  const handleLogout = useCallback(async () => {
    try {
      await AuthService.signout();
      dispatch(userActions.logout());
    } catch (error) {
      handleErrorWithToast(error);
    }
  }, [dispatch]);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.contentWrap}>
          <img src={appLogo} alt="app-logo" />
          {user.status === 'SUCCESS' && (
            <>
              <div className={styles.profile} onClick={handleClick}>
                <p>{user.details.username}</p>
                <RoundedProfile
                  imageUrl={user.details.profileImage}
                  size="40px"
                />
              </div>
            </>
          )}
        </div>
      </header>
      <Menu
        ref={menuRef}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableAutoFocus
        disableRestoreFocus
        MenuListProps={{
          onBlur: handleClose,
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: menuSx,
          },
        }}
        transformOrigin={menuTransformOrigin}
        anchorOrigin={menuAnchorOrigin}
      >
        <MenuItem onClick={onProfileClick}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Avatar /> Signout
        </MenuItem>
      </Menu>
    </>
  );
});

const menuSx: SxProps<Theme> = {
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
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

const menuTransformOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

const menuAnchorOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};
