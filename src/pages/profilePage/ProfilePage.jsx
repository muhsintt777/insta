import React from "react";
import "./ProfilePage.css";
import profilePic from "../../images/daniel.jpg";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import CakeIcon from "@mui/icons-material/Cake";
import { blue, green, yellow } from "@mui/material/colors";

const ProfilePage = () => {
  return (
    <div className="profilePage-container">
      <section className="profilePage-profileSec">
        <div className="profilePage-profileSec__imgWrapDiv">
          <img src={profilePic} alt="img" />
        </div>
        <div className="profilePage-profileSec__detailesDiv">
          <h3>Muhsin TT</h3>
          <div>
            <PlaceOutlinedIcon sx={{ color: green[500] }} fontSize="small" />{" "}
            <p>Kochi, KL</p>
          </div>
          <div>
            <ForwardToInboxOutlinedIcon
              sx={{ color: yellow[800] }}
              fontSize="small"
            />
            <p>muhsintt77@gmail.com</p>
          </div>
          <div>
            <CakeIcon fontSize="small" sx={{ color: blue[300] }} />
            <p>D O B: _</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
