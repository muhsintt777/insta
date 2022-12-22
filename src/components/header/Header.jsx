import React, { useState } from "react";
import "./Header.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { blue } from "@mui/material/colors";
import { Avatar, Badge, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../features/userSlice";
import HeaderProfileOptions from "./headerProfileOptions/HeaderProfileOptions";

const Header = () => {
  const [isOptions, setIsOptions] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const user = useSelector(selectUser);
  const smallScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)"
  );

  const handleProfileClick = () => {
    if (user) {
      setIsOptions(!isOptions);
    } else {
      navigate("/login");
    }
  };

  return (
    <header>
      <div className="header-logo">
        <h1>LOGO</h1>
      </div>
      <nav className="header-nav">
        <button onClick={() => navigate("/")} className="header-nav__homeBtn">
          <HomeOutlinedIcon
            fontSize={smallScreen ? "medium" : "small"}
            sx={{ color: blue[500] }}
          />
          <span className="header-nav__span">Homepage</span>
        </button>
        <button>
          <ConnectWithoutContactOutlinedIcon
            fontSize={smallScreen ? "medium" : "small"}
            sx={{ color: blue[500] }}
          />
          <span className="header-nav__span">Connections</span>
        </button>
        <button>
          <ChatOutlinedIcon
            fontSize={smallScreen ? "medium" : "small"}
            sx={{ color: blue[500] }}
          />
          <span className="header-nav__span">Messages</span>
        </button>
        <button>
          <NotificationsNoneOutlinedIcon
            fontSize={smallScreen ? "medium" : "small"}
            sx={{ color: blue[500] }}
          />

          <Badge badgeContent={4} color="secondary">
            <div>
              <span
                className="header-nav__span"
                style={{ marginRight: "10px" }}
              >
                Notifications
              </span>
            </div>
          </Badge>
        </button>
      </nav>
      <div className="header-profile">
        <button onClick={handleProfileClick} className="header-profile__btn">
          <span className="header-profile__leftSpan">
            {userInfo.name ? userInfo.name : "Sign In"}
          </span>
          <Avatar
            src={
              userInfo
                ? userInfo.profileImgUrl
                  ? userInfo.profileImgUrl
                  : ""
                : ""
            }
            sx={{ width: 36, height: 36 }}
          />
          <span className="header-profile__rightSpan">
            {userInfo.name ? userInfo.name : "Sign In"}
          </span>
        </button>
        {isOptions ? (
          <HeaderProfileOptions setIsOptions={setIsOptions} />
        ) : null}
      </div>
    </header>
  );
};

export default Header;
