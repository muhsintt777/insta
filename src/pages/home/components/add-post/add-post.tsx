import styles from "./add-postStyle.module.scss";
import { FormEvent } from "react";
import { RoundedProfile } from "components/rounded-profile/rounded-profile";

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
      </form>
    </div>
  );
};
