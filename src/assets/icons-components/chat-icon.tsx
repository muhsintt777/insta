import { FC } from "react";

interface ChatIconProps {
  color?: string;
  size?: string;
}

export const ChatIcon: FC<ChatIconProps> = ({
  color = "currentColor",
  size = "16px",
}) => {
  return (
    <svg
      stroke={color}
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke-width="2"
        d="M9,7 L9,1 L23,1 L23,11 L20,11 L20,16 L15,12 M1,7 L15,7 L15,18 L9,18 L4,22 L4,18 L1,18 L1,7 Z"
      ></path>
    </svg>
  );
};
