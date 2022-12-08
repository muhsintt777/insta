import React, { useRef, useState } from "react";
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
import { blue, green, grey, red, yellow } from "@mui/material/colors";

const PostForm = () => {
  const [textInput, setTextInput] = useState("");
  const [ImgFile, setImgFile] = useState(null);
  const fileRef = useRef();

  const onPrevImgClick = () => {
    setImgFile(null);
    fileRef.current.value = null;
  };

  const handleFileInputClick = () => {
    fileRef.current.click();
  };

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
        <div
          style={{ borderBottom: `solid 1px ${grey[200]}` }}
          className="postForm-topSection"
        >
          <Avatar />
          <div
            style={{ background: grey[100] }}
            className="postForm-Form__inputText"
          >
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
          {ImgFile ? (
            <img
              onClick={onPrevImgClick}
              title="Remove"
              className="postForm-topSection__prevImage"
              src={ImgFile}
              alt="img"
            />
          ) : null}
        </div>
        <div className="postForm-bottomSection">
          <button onClick={handleFileInputClick} type="button">
            <ImageOutlinedIcon sx={{ color: blue[700] }} fontSize="small" />
            <span className="posForm-bottomSection__button__span">Image</span>
            <input
              onChange={(e) =>
                setImgFile(URL.createObjectURL(e.target.files[0]))
              }
              ref={fileRef}
              hidden
              type="file"
              name="file"
            />
          </button>
          <button type="button">
            <VideoCameraBackOutlinedIcon
              sx={{ color: green[700] }}
              fontSize="small"
            />
            <span className="posForm-bottomSection__button__span">Video</span>
          </button>
          <button type="button">
            <AttachFileOutlinedIcon
              sx={{ color: yellow[700] }}
              fontSize="small"
            />
            <span className="posForm-bottomSection__button__span">
              Attachment
            </span>
          </button>
          <button type="button">
            <TagOutlinedIcon sx={{ color: red[700] }} fontSize="small" />
            <span className="posForm-bottomSection__button__span">Hashtag</span>
          </button>
          <button type="button">
            <AlternateEmailOutlinedIcon
              sx={{ color: grey[700] }}
              fontSize="small"
            />
            <span className="posForm-bottomSection__button__span">Mention</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
