import React, { useEffect } from "react";
import "./ProfilePage.css";
import profilePic from "../../images/daniel.jpg";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import CakeIcon from "@mui/icons-material/Cake";
import { blue, green, yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectUser, selectUserInfo } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
const ProfilePage = () => {
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="profilePage-container">
      <section className="profilePage-profileSec">
        <div className="profilePage-profileSec__imgWrapDiv">
          <img
            src={
              userInfo
                ? userInfo.profileImgUrl
                  ? userInfo.profileImgUrl
                  : profilePic
                : profilePic
            }
            alt="img"
          />
        </div>
        <div className="profilePage-profileSec__detailesDiv">
          <h3>{userInfo ? userInfo.name : "Name"}</h3>
          <div>
            <PlaceOutlinedIcon sx={{ color: green[500] }} fontSize="small" />{" "}
            <p>{userInfo ? userInfo.place : "Place"}</p>
          </div>
          <div>
            <ForwardToInboxOutlinedIcon
              sx={{ color: yellow[800] }}
              fontSize="small"
            />
            <p>{user ? user.email : "Email"}</p>
          </div>
          <div>
            <CakeIcon fontSize="small" sx={{ color: blue[300] }} />
            <p>D O B: _</p>
          </div>
        </div>
        <button
          onClick={() => {
            signOut(auth);
            navigate("/");
            console.log("signout");
          }}
        >
          signout
        </button>
      </section>
      <section className="profilePage-postsSec">
        <p>heheheheh</p>
      </section>
    </div>
  );
};

export default ProfilePage;
