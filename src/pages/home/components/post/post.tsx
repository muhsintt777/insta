import styles from "./postStyle.module.scss";
import profilePicPNG from "assets/images/profile-pic.png";
import { VerticalDotIcon } from "assets/icons-components/vertical-dot-icon";
import { PrimaryIconButton } from "components/primary-icon-button/primary-icon-button";

export const Post = () => {
  return (
    <article className={styles.container}>
      <div className={styles.head}>
        <div className={styles.imageWrap}>
          <img src={profilePicPNG} alt="img" />
        </div>
        <div>
          <p>name</p>
          <p>time ago</p>
        </div>
        <div className={styles.iconButton}>
          <PrimaryIconButton onClick={() => console.log("icon-button")}>
            <VerticalDotIcon color="var(--clr-grey)" />
          </PrimaryIconButton>
        </div>
      </div>
      <div className={styles.content}>content</div>
      <div className={styles.action}>actioon</div>
    </article>
  );
};
