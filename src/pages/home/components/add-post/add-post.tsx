import styles from "./add-postStyle.module.scss";
import { FormEvent, useState } from "react";

import { colors } from "main/global-style";
import { SendIcon } from "assets/icons-components/send-icon";
import { AddImageIcon } from "assets/icons-components/add-image-icon";
import { MentionIcon } from "assets/icons-components/mention-icon";
import { HashtagIcon } from "assets/icons-components/hashtag-icon";

import { SecondaryButton } from "components/secondary-button/secondary-button";
import { RoundedProfile } from "components/rounded-profile/rounded-profile";
import { PrimaryIconButton } from "components/primary-icon-button/primary-icon-button";
import { PrimaryModal } from "components/modal/primary-modal";

import { CreatePost } from "../create-post/create-post";

export const AddPost = () => {
  const [showModal, setShowModal] = useState(false);

  async function addPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("add post");
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <RoundedProfile />
        <form onSubmit={addPost}>
          <input type="text" placeholder="What's on your mind ? <username>" />
          <PrimaryIconButton type="submit">
            <SendIcon size="12px" color="var(--clr-grey)" />
          </PrimaryIconButton>

          {/* --- modal --- */}
          <PrimaryModal isOpen={showModal}>
            <CreatePost onClose={closeModal} />
          </PrimaryModal>
        </form>
      </div>
      <div className={styles.bottom}>
        <SecondaryButton hoverColor={colors.PRIMARY_LIGHT}>
          <AddImageIcon size="8px" color={colors.PRIMARY} />
          <span className={styles.bottomSpan}>Image</span>
        </SecondaryButton>
        <SecondaryButton hoverColor={colors.PRIMARY_LIGHT}>
          <MentionIcon size="8px" color={colors.PRIMARY} />{" "}
          <span className={styles.bottomSpan}>Mention</span>
        </SecondaryButton>
        <SecondaryButton onClick={openModal} hoverColor={colors.PRIMARY_LIGHT}>
          <HashtagIcon size="8px" color={colors.PRIMARY} />
          <span className={styles.bottomSpan}>Tag</span>
        </SecondaryButton>
      </div>
    </div>
  );
};
