import styles from './app-header.module.scss';
import { memo, MouseEvent, useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@insta/core/routes';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux-hooks';
import appLogo from '@insta/ui/images/app-logo.svg';
import { CustomMenu } from '@insta/ui/menus';
import { CustomAvatar } from '@insta/ui/avatars';
import { selectUser } from 'modules/user';
import { themeActions } from 'modules/theme';
import { handleErrorWithToast, useToast } from '@insta/uii/feedback/toast';
import {
  ChatIcon,
  FriendsIcon,
  HomeIcon,
  NotificationsIcon,
} from '@insta/ui/icons';
import { signOut } from 'app/session-workflows';
import { NavLink } from 'react-router-dom';

const navigationItems = [
  { label: 'Home', to: APP_ROUTES.HOME, Icon: HomeIcon },
  { label: 'Friends', to: APP_ROUTES.FRIENDS, Icon: FriendsIcon },
  { label: 'Messaging', to: APP_ROUTES.CHAT, Icon: ChatIcon },
  {
    label: 'Notifications',
    to: APP_ROUTES.NOTIFICATIONS,
    Icon: NotificationsIcon,
  },
];

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
            <nav className={styles.navigation} aria-label="Main navigation">
              {navigationItems.map(({ label, to, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === APP_ROUTES.HOME}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navigationLink} ${styles.active}`
                      : styles.navigationLink
                  }
                >
                  <Icon color="currentColor" size="20px" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          )}
          {user.details && (
            <div className={styles.profile} onClick={handleClick}>
              <p>{user.details.username}</p>
              <CustomAvatar src={user.details.profileImage} size="40px" />
            </div>
          )}
        </div>
      </header>
      <CustomMenu anchorEl={anchorEl} onClose={handleClose} items={menuItems} />
    </>
  );
});
