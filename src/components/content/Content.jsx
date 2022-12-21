import { grey } from "@mui/material/colors";
import React from "react";
import BottomNav from "../bottomNav/BottomNav";
import "./Content.css";
import Feed from "./feed/Feed";

const Content = () => {
  return (
    <div style={{ background: grey[100] }} className="content-container">
      <Feed />
      <BottomNav />
    </div>
  );
};

export default Content;
