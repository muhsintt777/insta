import { FC, ReactNode } from "react";
import { IconButton } from "@mui/material";

interface PrimaryIconButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const PrimaryIconButton: FC<PrimaryIconButtonProps> = ({
  children,
  onClick,
}) => {
  return <IconButton onClick={onClick}>{children}</IconButton>;
};
