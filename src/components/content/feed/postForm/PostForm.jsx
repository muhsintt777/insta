import React, { useState } from "react";
import "./PostForm.css";
import { Avatar } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";

const PostForm = () => {
  const [textInput, setTextInput] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(textInput);
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
      </form>
    </div>
  );
};

export default PostForm;
