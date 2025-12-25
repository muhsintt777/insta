import { FC } from 'react';

interface BackIconProps {
  color?: string;
  size?: string;
}

export const BackIcon: FC<BackIconProps> = ({
  color = 'currentColor',
  size = '16px',
}) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill={color}
      height={size}
      width={size}
    >
      <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"></path>
    </svg>
  );
};
