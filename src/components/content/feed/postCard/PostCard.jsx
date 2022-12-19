import React, { useEffect, useState } from "react";
import "./PostCard.css";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Avatar } from "@mui/material";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase/config";
import { grey } from "@mui/material/colors";
import { deleteObject, ref } from "firebase/storage";

const PostCard = ({
  message,
  hashtags,
  id,
  image,
  imageName,
  uid,
  createdAt,
}) => {
  const [isOptionBtns, setIsOptionBtns] = useState(false);
  const [postUserInfo, setPostUserInfo] = useState({});

  const fullDateStr = createdAt.toDate().toString();
  const splitDateArr = fullDateStr.split(" ");
  const shortDateArr = [splitDateArr[2], splitDateArr[1], splitDateArr[3]];
  const date = shortDateArr.join(" ");

  const handleDeletePost = async () => {
    setIsOptionBtns(false);
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      if (imageName) {
        const imgRef = ref(storage, `posts/${imageName}`);
        await deleteObject(imgRef)
          .then(() => {
            console.log("image deleted");
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
      console.log("post deleted");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchPostUser = async () => {
      const docRef = doc(db, "users", uid);
      const response = await getDoc(docRef);
      setPostUserInfo({ ...response.data() });
    };
    fetchPostUser();
  }, [uid]);

  return (
    <article className="postCard-article">
      <div className="postCard-topSection">
        <div className="postCard-topSection__avatar">
          <Avatar
            src={postUserInfo.profileImgUrl ? postUserInfo.profileImgUrl : null}
          />
        </div>
        <div className="postCard-topSection__name">
          <p className="postCard-topSection__name__namePara">
            {postUserInfo.name}
          </p>
          <p className="postCard-topSection__name__timePara">{date}</p>
        </div>
        <div
          onClick={() => setIsOptionBtns(!isOptionBtns)}
          className="postCard-topSection__optionButton"
          type="button"
        >
          <MoreHorizOutlinedIcon
            sx={isOptionBtns ? { color: "red" } : { color: grey[700] }}
          />
          {isOptionBtns ? (
            <div
              style={{
                background: grey[100],
                border: `1px solid ${grey[100]}`,
              }}
              className="postCard-topSection__options"
            >
              <button className="postCard-topSection__updateButton">
                Update
              </button>
              <button
                onClick={handleDeletePost}
                className="postCard-topSection__deleteButton"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="postCard-description">
        <p className="postCard-description__messagePara">{message}</p>
        <p className="postCard-description__hashtagPara">{hashtags}</p>
      </div>
      {image ? (
        <div className="postCard-imageSection">
          <img className="postCard-imageSection__img" src={image} alt="img" />
        </div>
      ) : null}

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
