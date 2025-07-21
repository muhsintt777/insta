import { FC } from 'react';
import { Button } from '@mui/material';
import { DotLoader } from 'components/loaders/dot-loader';

interface PrimaryButtonProps {
  text: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  showLoader?: boolean;
  fullWidth?: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  disabled = false,
  type = 'button',
  showLoader = false,
  fullWidth = false,
  onClick,
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      sx={{
        height: '40px',
        fontSize: '12px',
        borderRadius: '5px',
        fontFamily: 'var(--fnt-primary)',
        fontWeight: 900,
        letterSpacing: '-0.02rem',
        color: 'white',
        backgroundColor: 'var(--clr-primary)',

        '&:hover': {
          backgroundColor: 'var(--clr-primary)',
        },
      }}
    >
      {showLoader ? <DotLoader /> : text}
    </Button>
  );
};
