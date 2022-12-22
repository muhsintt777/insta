import React from "react";
import { Link } from "react-router-dom";
import "./HeaderProfileOptions.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { blue } from "@mui/material/colors";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";

const HeaderProfileOptions = ({ setIsOptions }) => {
  return (
    <nav className="headerProfileOptions">
      <Link to="/profile">
        <button onClick={() => setIsOptions(false)} type="button">
          <AccountCircleOutlinedIcon sx={{ color: blue[500] }} />
          <span className="headerProfileOptions-span">My Profile</span>
        </button>
      </Link>
      <button
        onClick={() => {
          signOut(auth);
          setIsOptions(false);
        }}
        type="button"
      >
        <LogoutOutlinedIcon sx={{ color: blue[500] }} />
        <span className="headerProfileOptions-span">Sign Out</span>
      </button>
    </nav>
  );
};

export default HeaderProfileOptions;
