import { FC, memo, ReactNode, useEffect, useRef } from 'react';
import { Menu, MenuItem, PopoverOrigin, SxProps, Theme } from '@mui/material';

interface MenuItemOption {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
}

interface CustomMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  items: MenuItemOption[];
  menuSx?: SxProps<Theme>;
}

const CustomMenuComp: FC<CustomMenuProps> = ({ anchorEl, onClose, items }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!open && menuRef.current) {
      const focusedElement = menuRef.current.querySelector(':focus');
      if (focusedElement && focusedElement instanceof HTMLElement) {
        focusedElement.blur();
      }
    }
  }, [open]);

  return (
    <Menu
      ref={menuRef}
      anchorEl={anchorEl}
      id="custom-menu"
      open={open}
      onClose={onClose}
      onClick={onClose}
      disableAutoFocus
      disableRestoreFocus
      MenuListProps={{
        onBlur: onClose,
      }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: menuSx ?? menuSx,
        },
      }}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
    >
      {items.map((item) => (
        <MenuItem
          key={item.label}
          sx={menuItemSx}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.icon}
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

const menuSx: SxProps<Theme> = {
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px var(--clr-shadow-default))',
  bgcolor: 'var(--clr-bg-primary)',
  color: 'var(--clr-fnt-primary)',
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
    bgcolor: 'var(--clr-bg-primary)',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

const menuItemSx: SxProps<Theme> = {
  ':hover': { backgroundColor: 'var(--clr-border)' },
};

const transformOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'top',
};

const anchorOrigin: PopoverOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};

export const CustomMenu = memo(CustomMenuComp);
