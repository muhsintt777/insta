import { FC, memo, useMemo } from 'react';
import { CircularProgress } from '@mui/material';
import { colors } from 'main/global-style';

interface CircleLoaderProps {
  size?: 'small' | 'medium' | 'large';
}

const CircleLoaderComp: FC<CircleLoaderProps> = ({ size }) => {
  const convertedSize = useMemo(() => {
    switch (size) {
      case 'small':
        return '20px';
      case 'medium':
        return '25px';
      case 'large':
        return '30px';
      default:
        return '25px';
    }
  }, [size]);

  return (
    <CircularProgress sx={{ color: colors.PRIMARY }} size={convertedSize} />
  );
};

export const CircleLoader = memo(CircleLoaderComp);
