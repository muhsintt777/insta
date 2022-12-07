import React, { useState } from "react";
import "./PostForm.css";
import { Avatar } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { postsColRef } from "../../../../firebase/config";

const PostForm = () => {
  const [textInput, setTextInput] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(postsColRef, {
        message: textInput,
        createdAt: serverTimestamp(),
      });
      setTextInput("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="postForm-container">
      <form onSubmit={onSubmit}>
        <div className="postForm-topSection">
          <Avatar />
          <div className="postForm-Form__inputText">
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Share something..."
              type="text"
              required
            />
            <button type="submit">
              <CreateOutlinedIcon />
            </button>
          </div>
        </div>
        <div className="postForm-bottomSection">
          <button type="button">
            <ImageOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Image</span>
          </button>
          <button type="button">
            <VideoCameraBackOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Video</span>
          </button>
          <button type="button">
            <AttachFileOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">
              Attachment
            </span>
          </button>
          <button type="button">
            <TagOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Hashtag</span>
          </button>
          <button type="button">
            <AlternateEmailOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Mention</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
