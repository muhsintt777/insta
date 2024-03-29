import styles from "./postStyle.module.scss";

import test1 from "assets/images/test1.jpg";
import { VerticalDotIcon } from "assets/icons-components/vertical-dot-icon";
import { LikeIcon } from "assets/icons-components/like-icon";
import { CommentIcon } from "assets/icons-components/comment-icon";
import { ShareIcon } from "assets/icons-components/share-icon";
import { PrimaryIconButton } from "components/primary-icon-button/primary-icon-button";
import { RoundedProfile } from "components/rounded-profile/rounded-profile";

export const Post = () => {
  return (
    <article className={styles.container}>
      <div className={styles.head}>
        <RoundedProfile />
        <div>
          <p>John Doe</p>
          <p>5 mins ago</p>
        </div>
        <div className={styles.iconButton}>
          <PrimaryIconButton onClick={() => console.log("icon-button")}>
            <VerticalDotIcon color="var(--clr-grey)" />
          </PrimaryIconButton>
        </div>
      </div>
      <div className={styles.content}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
        </p>
        <img src={test1} alt="img" />
      </div>
      <div className={styles.actions}>
        <LikeIcon />
        <CommentIcon />
        <ShareIcon />
      </div>
    </article>
  );
};
