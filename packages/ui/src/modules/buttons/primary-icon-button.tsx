import { FC, MouseEvent, ReactNode } from 'react';
import { IconButton } from '@mui/material';

interface PrimaryIconButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export const PrimaryIconButton: FC<PrimaryIconButtonProps> = ({
  children,
  onClick,
  type = 'button',
}) => {
  return (
    <IconButton type={type} onClick={onClick} sx={{ padding: '8px' }}>
      {children}
    </IconButton>
  );
};
