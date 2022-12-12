import React from "react";
import "./Header.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { blue } from "@mui/material/colors";
import { Avatar, Badge } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header-logo">
        <h1>Name</h1>
      </div>
      <nav className="header-nav">
        <button onClick={() => navigate("/")} className="header-nav__homeBtn">
          <HomeOutlinedIcon fontSize="small" sx={{ color: blue[500] }} />
          <span style={{ marginLeft: "5px" }}>Homepage</span>
        </button>
        <button>
          <ConnectWithoutContactOutlinedIcon
            fontSize="small"
            sx={{ color: blue[500] }}
          />
          <span style={{ marginLeft: "5px" }}>Connections</span>
        </button>
        <button>
          <ChatOutlinedIcon fontSize="small" sx={{ color: blue[500] }} />
          <span style={{ marginLeft: "5px" }}>Messages</span>
        </button>
        <button>
          <NotificationsNoneOutlinedIcon
            fontSize="small"
            sx={{ color: blue[500] }}
          />

          <Badge badgeContent={4} color="secondary">
            <div>
              <span style={{ marginLeft: "5px", marginRight: "10px" }}>
                Notifications
              </span>
            </div>
          </Badge>
        </button>
      </nav>
      <div className="header-profile">
        <Link to="/profile">
          <button className="header-profile__btn">
            <Avatar sx={{ width: 36, height: 36 }} />
            <span style={{ marginLeft: "7px" }}>Muhsin TT</span>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
