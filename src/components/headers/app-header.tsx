import styles from './app-header.module.scss';
import { memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { APP_ROUTES } from 'configs/app-routes';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import appLogo from 'assets/images/app-logo.svg';
import { CustomMenu } from 'components/menus/custom-menu';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { selectUser, userActions } from 'features/user/user-slice';
import { AuthService } from 'features/auth/auth-service';
import { themeActions } from 'features/theme/theme-slice';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';

export const Header = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      await AuthService.signout();
      dispatch(userActions.logout());
    } catch (error) {
      handleErrorWithToast(error);
    }
  }, [dispatch]);

  const menuItems = useMemo(
    () => [
      {
        label: 'Profile',
        onClick: onProfileClick,
        icon: <Avatar sx={{ color: 'red' }} />,
      },
      {
        label: 'Switch Theme',
        onClick: handleThemeSwitch,
        icon: <Avatar />,
      },
      {
        label: 'Signout',
        onClick: handleLogout,
        icon: <Avatar />,
      },
    ],
    [onProfileClick, handleThemeSwitch, handleLogout],
  );

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
      <CustomMenu anchorEl={anchorEl} onClose={handleClose} items={menuItems} />
    </>
  );
});
