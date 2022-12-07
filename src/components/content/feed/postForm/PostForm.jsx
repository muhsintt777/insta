import React, { useState } from "react";
import "./PostForm.css";
import { Avatar } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
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
            <CreateOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Image</span>
          </button>
          <button type="button">
            <CreateOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Video</span>
          </button>
          <button type="button">
            <CreateOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">
              Attachment
            </span>
          </button>
          <button type="button">
            <CreateOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Hashtag</span>
          </button>
          <button type="button">
            <CreateOutlinedIcon fontSize="small" />
            <span className="posForm-bottomSection__button__span">Mention</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
