import { Button } from "@mui/material";
import { FC } from "react";

interface PrimaryButtonProps {
  text: string;
  disabled: boolean;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ text, disabled }) => {
  return (
    <Button
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
      {text}
    </Button>
  );
};
