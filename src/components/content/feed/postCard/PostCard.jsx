import React from "react";
import "./PostCard.css";
import danielPic from "../../../../images/daniel.jpg";
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
      <div className="postCard-description">
        <p className="postCard-description__messagePara">
          Was great meeting up with Anna and Dave Bishop at the breakfast talk!
        </p>
        <p className="postCard-description__hashtagPara">#breakfast</p>
      </div>
      <div className="postCard-imageSection">
        <img className="postCard-imageSection__img" src={danielPic} alt="img" />
      </div>
    </article>
  );
};

export default PostCard;
