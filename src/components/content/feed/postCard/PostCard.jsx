import React from "react";
import "./PostCard.css";
// import danielPic from "../../../../images/daniel.jpg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Avatar } from "@mui/material";

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
          <MoreHorizOutlinedIcon />
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
          <button>
            <FavoriteBorderOutlinedIcon />
          </button>
          <button>
            <ChatBubbleOutlineRoundedIcon />
          </button>
        </div>
        <div className="postCard-bottomSection__sendButton">
          <SendOutlinedIcon />
        </div>
      </div>
    </article>
  );
};

export default PostCard;
