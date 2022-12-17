import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CloseButton.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { red } from "@mui/material/colors";

const CloseButton = () => {
  const [iconHover, setIconHover] = useState(false);

  const handleMouseEnter = () => {
    setIconHover(true);
  };

  const handleMouseLeave = () => {
    setIconHover(false);
  };

  return (
    <div
      title="Home"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="closeButton"
    >
      <Link to="/">
        <CloseRoundedIcon
          sx={iconHover ? { color: red[600] } : { color: red[200] }}
          fontSize="large"
        />
      </Link>
    </div>
  );
};

export default CloseButton;
