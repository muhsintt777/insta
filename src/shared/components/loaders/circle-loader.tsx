import { FC, memo } from 'react';
import { CircularProgress } from '@mui/material';
import { colors } from 'shared/styles/global-style';

export type LoaderSize = 'small' | 'medium' | 'large';

interface CircleLoaderProps {
  size?: LoaderSize;
}

const LOADER_SIZES: Record<LoaderSize, string> = {
  small: '20px',
  medium: '25px',
  large: '30px',
};

const CircleLoaderComp: FC<CircleLoaderProps> = ({ size = 'medium' }) => (
  <CircularProgress sx={{ color: colors.PRIMARY }} size={LOADER_SIZES[size]} />
);

export const CircleLoader = memo(CircleLoaderComp);
