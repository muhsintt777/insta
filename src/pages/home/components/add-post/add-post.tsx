import styles from "./add-postStyle.module.scss";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { FILE_SIZE } from "configs/constants";
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
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const fileInpRef = useRef<HTMLInputElement | null>(null);

  async function addPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("add post");

    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(formData.get("image"));
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function onImageClick() {
    fileInpRef.current?.click();
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    const imageFile = files[0];
    if (imageFile.size > FILE_SIZE.postImage && fileInpRef.current) {
      alert("toobig");
      fileInpRef.current.files = null;
      setImage(null);
    } else {
      setImageFile(imageFile);
      const imageDataUrl = URL.createObjectURL(imageFile);
      setImage(imageDataUrl);
    }
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
      {image && <img style={{ width: "300px" }} src={image} alt="" />}
      <div className={styles.bottom}>
        <SecondaryButton
          onClick={onImageClick}
          hoverColor={colors.PRIMARY_LIGHT}
        >
          <AddImageIcon size="8px" color={colors.PRIMARY} />
          <span className={styles.bottomSpan}>Image</span>
          <input
            ref={fileInpRef}
            type="file"
            name="image"
            hidden
            accept="image/png image/jpeg image/jpg image/webp"
            onChange={onFileChange}
          />
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
