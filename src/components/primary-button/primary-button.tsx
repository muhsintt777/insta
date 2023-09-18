import { Button } from "@mui/material";
import { DotLoader } from "components/loaders/dot-loader";
import { FC } from "react";

interface PrimaryButtonProps {
  text: string;
  disabled: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  showLoader?: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  disabled,
  type = "button",
  showLoader = false,
}) => {
  return (
    <Button
      type={type}
      fullWidth
      disabled={disabled}
      variant="contained"
      sx={{
        height: "43px",
        fontSize: "12px",
        borderRadius: "5px",
        fontFamily: "var(--fnt-primary)",
        fontWeight: 900,
        letterSpacing: "-0.02rem",
        color: "white",
        backgroundColor: "var(--clr-primary)",

        "&:hover": {
          backgroundColor: "var(--clr-primary)",
        },
      }}
    >
      {showLoader ? <DotLoader /> : text}
    </Button>
  );
};
