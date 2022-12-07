import React from "react";
import "./PostCard.css";
// import danielPic from "../../../../images/daniel.jpg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Avatar } from "@mui/material";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { grey } from "@mui/material/colors";

const PostCard = ({ message, hashtags, id }) => {
  const handleDeletePost = async () => {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      console.log("post deleted");
    } catch (err) {
      console.log(err.message);
    }
  };
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
        <button
          className="postCard-topSection__optionButton"
          type="button"
          onClick={handleDeletePost}
        >
          <MoreHorizOutlinedIcon sx={{ color: grey[700] }} />
        </button>
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
          <button className="postCard-bottomSection__reactionButtons__btn">
            <FavoriteBorderOutlinedIcon sx={{ color: grey[700] }} />
          </button>
          <button className="postCard-bottomSection__reactionButtons__btn">
            <ChatBubbleOutlineRoundedIcon sx={{ color: grey[700] }} />
          </button>
        </div>
        <button type="button" className="postCard-bottomSection__sendButton">
          <SendOutlinedIcon sx={{ color: grey[700] }} />
        </button>
      </div>
    </article>
  );
};

export default PostCard;
