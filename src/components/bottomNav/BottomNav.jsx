import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";

const BottomNav = () => {
  return (
    <nav className="bottomNav">
      <Link>
        <button type="button">
          <HomeOutlinedIcon />
        </button>
      </Link>
      <Link>
        <button type="button">
          <MessageOutlinedIcon />
        </button>
      </Link>
      <Link>
        <button type="button">
          <NotificationsNoneOutlinedIcon />
        </button>
      </Link>
      <Link>
        <button type="button">
          <ConnectWithoutContactOutlinedIcon />
        </button>
      </Link>
    </nav>
  );
};

export default BottomNav;
