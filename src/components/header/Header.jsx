import React from "react";
import "./Header.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { blue } from "@mui/material/colors";
import { Avatar } from "@mui/material";

const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <h1>INSTA</h1>
      </div>
      <nav className="header-nav">
        <button>
          <HomeOutlinedIcon sx={{ color: blue[500] }} />
          <span style={{ marginLeft: "5px" }}>Homepage</span>
        </button>
        <button>
          <HomeOutlinedIcon sx={{ color: blue[500] }} />
          <span style={{ marginLeft: "5px" }}>Connections</span>
        </button>
        <button>
          <HomeOutlinedIcon sx={{ color: blue[500] }} />
          <span style={{ marginLeft: "5px" }}>Messages</span>
        </button>
        <button>
          <HomeOutlinedIcon sx={{ color: blue[500] }} />
          <span style={{ marginLeft: "5px" }}>Notifications</span>
        </button>
      </nav>
      <div className="header-profile">
        <button>
          <Avatar />
        </button>
      </div>
    </header>
  );
};

export default Header;
