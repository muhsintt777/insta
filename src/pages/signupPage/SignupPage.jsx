import React, { useRef, useState } from "react";
import "./SignupPage.css";
import demoPic from "../../images/demoAvatar.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { blue } from "@mui/material/colors";

const SignupPage = () => {
  const inputPhotoRef = useRef();
  const [prevImg, setPrevImg] = useState(demoPic);
  const handleSignup = (e) => {
    e.preventDefault();
  };
  return (
    <section className="signupPage-container">
      <form onSubmit={handleSignup} className="signupPage-form" action="signup">
        <div className="signupPage-form__photoDiv">
          <div className="signupPage-form__imgContainer">
            <img className="signupPage-form__img" src={prevImg} alt="img" />
            <button onClick={() => inputPhotoRef.current.click()} type="button">
              <CameraAltOutlinedIcon
                sx={{ color: blue[700] }}
                fontSize="small"
              />
            </button>
          </div>
          <input
            onChange={(e) => setPrevImg(URL.createObjectURL(e.target.files[0]))}
            ref={inputPhotoRef}
            hidden
            type="file"
            name="photo"
          />
        </div>
        <div className="signupPage-form__inputsContainer">
          <div className="signupPage-form__inputDiv">
            <label htmlFor="name">Name</label>
            <input
              required
              placeholder="eg: John Doe"
              type="text"
              name="name"
            />
          </div>
          <div className="signupPage-form__inputDiv">
            <label htmlFor="place">Place</label>
            <input
              required
              placeholder="eg: Kochi,KL"
              type="text"
              name="place"
            />
          </div>
          <div className="signupPage-form__inputDiv">
            <label htmlFor="email">Email</label>
            <input
              required
              placeholder="eg: johndoe@gmail.com"
              type="email"
              name="email"
            />
          </div>
          <div className="signupPage-form__inputDiv">
            <label htmlFor="password">Password</label>
            <input required type="password" name="password" />
          </div>
        </div>
        <div className="signupPage-form__buttonDiv">
          <button style={{ background: blue[100] }} type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
