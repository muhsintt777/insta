import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import { blue } from "@mui/material/colors";

const BottomNav = () => {
  return (
    <nav className="bottomNav">
      <Link to="/">
        <button type="button">
          <HomeOutlinedIcon sx={{ color: blue[500] }} />
        </button>
      </Link>
      <Link>
        <button type="button">
          <MessageOutlinedIcon sx={{ color: blue[500] }} />
        </button>
      </Link>
      <Link>
        <button type="button">
          <NotificationsNoneOutlinedIcon sx={{ color: blue[500] }} />
        </button>
      </Link>
      <Link>
        <button type="button">
          <ConnectWithoutContactOutlinedIcon sx={{ color: blue[500] }} />
        </button>
      </Link>
    </nav>
  );
};

export default BottomNav;
