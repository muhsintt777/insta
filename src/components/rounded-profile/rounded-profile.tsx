import styles from "./rounded-profileStyle.module.scss";

import { FC } from "react";

import profilePicPNG from "assets/images/profile-pic.png";

interface RoundedProfileProps {
  size?: string;
}

export const RoundedProfile: FC<RoundedProfileProps> = ({ size = "45px" }) => {
  return (
    <div style={{ width: size, height: size }} className={styles.container}>
      <img src={profilePicPNG} alt="img" />
    </div>
  );
};
