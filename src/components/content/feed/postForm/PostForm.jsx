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
import { postsColRef, storage } from "../../../../firebase/config";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../../../features/userSlice";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const [textInput, setTextInput] = useState("");
  const [ImgFile, setImgFile] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const fileRef = useRef();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);

  const onPrevImgClick = () => {
    setImgFile(null);
    fileRef.current.value = null;
  };

  const handleFileInputClick = () => {
    fileRef.current.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    setIsSubmitDisabled(true);
    let imgUrl = null;
    let randomId = null;
    try {
      if (ImgFile) {
        randomId = nanoid();
        const storageRef = ref(storage, `posts/${randomId}`);
        await uploadBytes(storageRef, fileRef.current.files[0]);
        console.log("umg uploadded");
        imgUrl = await getDownloadURL(storageRef);
      }
      await addDoc(postsColRef, {
        message: textInput,
        createdAt: serverTimestamp(),
        imgUrl: imgUrl,
        imgName: randomId,
        uid: user.uid,
      });
      setTextInput("");
      setImgFile(null);
      setIsSubmitDisabled(false);
      fileRef.current.value = null;
    } catch (err) {
      console.log(err.message);
      setIsSubmitDisabled(false);
    }
  };

  return (
    <div className="postForm-container">
      <form onSubmit={onSubmit}>
        <div
          style={{ borderBottom: `solid 1px ${grey[200]}` }}
          className="postForm-topSection"
        >
          <Avatar
            src={userInfo.profileImgUrl ? userInfo.profileImgUrl : null}
          />
          <div
            style={{ background: grey[100] }}
            className="postForm-Form__inputText"
          >
            <input
              className="postForm-form__postInput"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Share something..."
              type="text"
              required
            />
            <button disabled={isSubmitDisabled} type="submit">
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
        <div className="postForm-hashtagDiv">
          <input
            title="Separate tags using space"
            placeholder="eg:- nature travel sea"
            type="text"
            name="hashtag"
          />
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
