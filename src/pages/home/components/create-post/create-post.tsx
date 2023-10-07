import styles from "./create-postStyle.module.scss";
import { FC } from "react";

import { PrimaryModalHeader } from "components/primary-modal-header/primary-modal-header";

interface CreatePostProps {
  onClose: () => void;
}

export const CreatePost: FC<CreatePostProps> = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <PrimaryModalHeader title="create post" onClose={onClose} />
      <div className={styles.body}>body</div>
    </div>
  );
};
