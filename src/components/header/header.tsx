import styles from './header.module.scss';
import { memo, MouseEvent, useCallback, useState } from 'react';
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
import { useAppSelector } from 'hooks/redux-hooks';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { selectUser } from 'features/user/user-slice';

export const Header = memo(() => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onProfileClick = useCallback(() => {
    handleClose();
    if (pathname === APP_ROUTES.PROFILE) return;
    navigate(APP_ROUTES.PROFILE);
  }, [navigate, pathname]);

  return (
    <>
      <header className={styles.container}>
        <div className="app-container">
          <div className={styles.contentWrap}>
            <div>logo</div>
            {user.status === 'SUCCESS' && (
              <>
                <div className={styles.profile} onClick={handleClick}>
                  <p>{user.details.fullName}</p>
                  <RoundedProfile size="40px" />
                </div>
              </>
            )}
          </div>
        </div>
      </header>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
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
