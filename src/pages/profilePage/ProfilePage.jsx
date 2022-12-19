import React, { useEffect, useState } from "react";
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
import { auth, postsColRef } from "../../firebase/config";
import { getDocs, query, where } from "firebase/firestore";
import PostCard from "../../components/content/feed/postCard/PostCard";

const ProfilePage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const user = useSelector(selectUser);
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  const renderedMyposts = myPosts.map((post) => {
    return (
      <PostCard
        key={post.id}
        id={post.id}
        message={post.message}
        hashtags={post.hashtags}
        image={post.imgUrl}
        imageName={post.imgName}
        uid={post.uid}
        createdAt={post.createdAt}
      />
    );
  });

  useEffect(() => {
    const fetchMyPosts = async () => {
      const q = query(postsColRef, where("uid", "==", user.uid));
      const response = await getDocs(q);
      const postArr = [];
      response.forEach((docc) => {
        postArr.push({ ...docc.data(), id: docc.id });
      });
      setMyPosts(postArr);
    };
    fetchMyPosts();
  }, [user]);

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
      <section className="profilePage-postsSec">{renderedMyposts}</section>
    </div>
  );
};

export default ProfilePage;
