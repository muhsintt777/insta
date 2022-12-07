import { grey } from "@mui/material/colors";
import React from "react";
import "./Content.css";
import Feed from "./feed/Feed";

const Content = () => {
  return (
    <div style={{ background: grey[100] }} className="content-container">
      <Feed />
    </div>
  );
};

export default Content;
