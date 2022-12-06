import React from "react";
import "./PostCard.css";
// import danielPic from "../../../../images/daniel.jpg";
import { Avatar } from "@mui/material";
import { OpenInNewTwoTone } from "@mui/icons-material";

const PostCard = ({ message, hashtags }) => {
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
        <p className="postCard-description__messagePara">{message}</p>
        <p className="postCard-description__hashtagPara">{hashtags}</p>
      </div>
      {/* <div className="postCard-imageSection">
        <img className="postCard-imageSection__img" src={danielPic} alt="img" />
      </div> */}
      <div className="postCard-bottomSection">
        <div className="postCard-bottomSection__reactionButtons">
          <button>like</button>
          <button>comment</button>
        </div>
        <div className="postCard-bottomSection__sendButton">
          <OpenInNewTwoTone />
        </div>
      </div>
    </article>
  );
};

export default PostCard;
