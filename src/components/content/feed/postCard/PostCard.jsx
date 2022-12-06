import React from "react";
import "./PostCard.css";
import { Avatar } from "@mui/material";
import { OpenInNewTwoTone } from "@mui/icons-material";

const PostCard = () => {
  return (
    <article className="postCard-article">
      <div className="postCard-topSection">
        <div className="postCard-topSection__avatar">
          <Avatar />
        </div>
        <div className="postCard-topSection__name">
          <p className="postCard-topSection__name__namePara">Muhsin TT</p>
          <p className="postCard-topSection__name__timePara">2 hours ago</p>
        </div>
        <div className="postCard-topSection__optionButton">
          <OpenInNewTwoTone />
        </div>
      </div>
    </article>
  );
};

export default PostCard;
