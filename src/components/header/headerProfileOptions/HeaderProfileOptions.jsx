import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./HeaderProfileOptions.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { blue } from "@mui/material/colors";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

const HeaderProfileOptions = ({ setIsOptions }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
    setIsOptions(false);
    signOut(auth);
  };

  return (
    <nav className="headerProfileOptions">
      {location.pathname !== "/profile" ? (
        <Link to="/profile">
          <button onClick={() => setIsOptions(false)} type="button">
            <AccountCircleOutlinedIcon sx={{ color: blue[500] }} />
            <span className="headerProfileOptions-span">My Profile</span>
          </button>
        </Link>
      ) : null}

      <button onClick={handleSignOut} type="button">
        <LogoutOutlinedIcon sx={{ color: blue[500] }} />
        <span className="headerProfileOptions-span">Sign Out</span>
      </button>
    </nav>
  );
};

export default HeaderProfileOptions;
