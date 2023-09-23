import { FC } from "react";

interface HomeIconProps {
  color?: string;
  size?: string;
}

export const HomeIcon: FC<HomeIconProps> = ({
  color = "currentColor",
  size = "16px",
}) => {
  return (
    <div>
      <svg
        stroke={color}
        fill=""
        strokeWidth="0"
        viewBox="0 0 24 24"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          strokeWidth="2"
          d="M1,11 L12,2 L23,11 M15,23 L15,15 L15,15 L9,15 L9,23 M4,23 L4,9 M20,23 L20,9"
        ></path>
      </svg>
    </div>
  );
};
