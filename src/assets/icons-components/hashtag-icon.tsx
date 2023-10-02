import { FC } from "react";

interface HashtagIconProps {
  color?: string;
  size?: string;
}

export const HashtagIcon: FC<HashtagIconProps> = ({
  color = "currentColor",
  size = "16px",
}) => {
  return (
    <svg
      stroke={color}
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
      height={size}
      width={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
      ></path>
    </svg>
  );
};
