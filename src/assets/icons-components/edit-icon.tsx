import { FC } from 'react';
import { colors } from 'main/global-style';

interface EditIconProps {
  color?: string;
  size?: string;
}

export const EditIcon: FC<EditIconProps> = ({
  color = colors.BLACK,
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
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"></path>
    </svg>
  );
};
