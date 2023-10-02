import { FC, ReactNode } from "react";
import { IconButton } from "@mui/material";

interface PrimaryIconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const PrimaryIconButton: FC<PrimaryIconButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <IconButton type={type} onClick={onClick}>
      {children}
    </IconButton>
  );
};
