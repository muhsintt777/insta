import styles from "./add-postStyle.module.scss";
import { FormEvent } from "react";

import { SendIcon } from "assets/icons-components/send-icon";
import { RoundedProfile } from "components/rounded-profile/rounded-profile";
import { PrimaryIconButton } from "components/primary-icon-button/primary-icon-button";

export const AddPost = () => {
  async function addPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("add post");
  }
  return (
    <div className={styles.container}>
      <RoundedProfile />
      <form onSubmit={addPost}>
        <input type="text" placeholder="What's on your mind ? <username>" />
        <PrimaryIconButton type="submit">
          <SendIcon size="12px" color="var(--clr-grey)" />
        </PrimaryIconButton>
      </form>
    </div>
  );
};
