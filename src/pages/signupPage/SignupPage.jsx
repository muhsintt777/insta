import React, { useRef, useState } from "react";
import "./SignupPage.css";
import demoPic from "../../images/demoAvatar.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { blue } from "@mui/material/colors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const SignupPage = () => {
  const inputPhotoRef = useRef();
  const [prevImg, setPrevImg] = useState(demoPic);
  const [nameInput, setNameInput] = useState("");
  const [placeInput, setPlaceInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitDisabled(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        emailInput,
        passwordInput
      );
      const uid = userCred.user.uid;

      const imgRef = ref(storage, `users/${uid}`);
      await uploadBytesResumable(imgRef, inputPhotoRef.current.files[0]);
      const url = await getDownloadURL(imgRef);

      await setDoc(doc(db, "users", uid), {
        name: nameInput,
        place: placeInput,
        profileImgUrl: url,
        createdAt: serverTimestamp(),
      });

      console.log("user created");
      dispatch(login(userCred));
      setPrevImg(demoPic);
      setNameInput("");
      setPlaceInput("");
      setPasswordInput("");
      setEmailInput("");
      setIsSubmitDisabled(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setIsSubmitDisabled(false);
    }
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
              minLength="3"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              placeholder="eg: John Doe"
              type="text"
              name="name"
            />
          </div>
          <div className="signupPage-form__inputDiv">
            <label htmlFor="place">Place</label>
            <input
              minLength="2"
              value={placeInput}
              onChange={(e) => setPlaceInput(e.target.value)}
              required
              placeholder="eg: Kochi,KL"
              type="text"
              name="place"
            />
          </div>
          <div className="signupPage-form__inputDiv">
            <label htmlFor="email">Email</label>
            <input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              placeholder="eg: johndoe@gmail.com"
              type="email"
              name="email"
            />
          </div>
          <div className="signupPage-form__inputDiv">
            <label htmlFor="password">Password</label>
            <input
              minLength="8"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
              type="password"
              name="password"
            />
          </div>
        </div>
        <div className="signupPage-form__buttonDiv">
          <button
            disabled={isSubmitDisabled}
            style={{ background: blue[100] }}
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignupPage;
