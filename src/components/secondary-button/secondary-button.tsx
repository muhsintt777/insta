import { Button } from "@mui/material";
import { DotLoader } from "components/loaders/dot-loader";
import { FC, ReactNode } from "react";

interface SecondaryButtonProps {
  children: ReactNode;
  disabled?: boolean;
  showLoader?: boolean;
  fullWidth?: boolean;
  hoverColor?: string;
  color?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  disabled = false,
  showLoader = false,
  fullWidth = false,
  type = "button",
  hoverColor = "none",
  color = "var(--clr-grey)",
  onClick,
}) => {
  return (
    <Button
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
      sx={{
        textTransform: "none",
        color: color,
        "&:hover": {
          backgroundColor: hoverColor,
        },
      }}
      onClick={onClick}
    >
      {showLoader ? <DotLoader /> : children}
    </Button>
  );
};
