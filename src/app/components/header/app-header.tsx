import styles from './app-header.module.scss';
import { memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'shared/routes';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import appLogo from 'shared/assets/images/app-logo.svg';
import { CustomMenu } from 'shared/components/menus/custom-menu';
import { CustomAvatar } from 'shared/components/custom-avatar/custom-avatar';
import { selectUser } from 'modules/user';
import { themeActions } from 'modules/theme';
import { handleErrorWithToast, useToast } from 'shared/feedback/toast';
import { signOut } from 'app/session-workflows';

export const Header = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const onProfileClick = useCallback(() => {
    handleClose();
    if (pathname === APP_ROUTES.PROFILE) return;
    navigate(APP_ROUTES.PROFILE);
  }, [handleClose, navigate, pathname]);

  const handleThemeSwitch = useCallback(() => {
    dispatch(themeActions.toggleTheme());
    handleClose();
  }, [handleClose, dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(dispatch);
    } catch (error) {
      handleErrorWithToast(error, showToast);
    }
  }, [dispatch, showToast]);

  const menuItems = useMemo(
    () => [
      {
        label: 'Profile',
        onClick: onProfileClick,
        icon: <CustomAvatar />,
      },
      {
        label: 'Switch Theme',
        onClick: handleThemeSwitch,
        icon: <CustomAvatar />,
      },
      {
        label: 'Signout',
        onClick: handleLogout,
        icon: <CustomAvatar />,
      },
    ],
    [onProfileClick, handleThemeSwitch, handleLogout],
  );

  return (
    <>
      <header className={styles.container}>
        <div className={styles.contentWrap}>
          <img src={appLogo} alt="app-logo" />
          {user.details && (
            <>
              <div className={styles.profile} onClick={handleClick}>
                <p>{user.details.username}</p>
                <CustomAvatar src={user.details.profileImage} size="40px" />
              </div>
            </>
          )}
        </div>
      </header>
      <CustomMenu anchorEl={anchorEl} onClose={handleClose} items={menuItems} />
    </>
  );
});
