import { FC, memo } from 'react';
import { Avatar, SxProps, Theme } from '@mui/material';

interface CustomAvatarProps {
  src?: string | null;
  size?: string;
}

const CustomAvatarComp: FC<CustomAvatarProps> = ({ src, size = '40px' }) => {
  return <Avatar sx={{ ...sx, width: size, height: size }} src={src || ''} />;
};

const sx: SxProps<Theme> = {
  width: '100px',
  height: '100px',
  color: 'var(--clr-bg-primary)',
  backgroundColor: 'var(--clr-bg-secondary)',
};

export const CustomAvatar = memo(CustomAvatarComp);
