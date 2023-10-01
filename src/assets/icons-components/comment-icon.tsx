import { FC } from "react";

interface CommentIconProps {
  color?: string;
  size?: string;
}

export const CommentIcon: FC<CommentIconProps> = ({
  color = "currentColor",
  size = "16px",
}) => {
  return (
    <svg
      stroke="currentColor"
      fill={color}
      strokeWidth="0"
      viewBox="0 0 32 32"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 3 5 L 3 23 L 8 23 L 8 28.078125 L 14.351563 23 L 29 23 L 29 5 Z M 5 7 L 27 7 L 27 21 L 13.648438 21 L 10 23.917969 L 10 21 L 5 21 Z"></path>
    </svg>
  );
};
