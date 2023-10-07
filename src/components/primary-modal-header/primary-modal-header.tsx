import styles from "./primary-modal-headerStyle.module.scss";
import { FC } from "react";

import { CloseIcon } from "assets/icons-components/close-icon";
import { PrimaryIconButton } from "components/primary-icon-button/primary-icon-button";

interface PrimaryModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const PrimaryModalHeader: FC<PrimaryModalHeaderProps> = ({
  title,
  onClose,
}) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <PrimaryIconButton onClick={onClose}>
        <CloseIcon />
      </PrimaryIconButton>
    </div>
  );
};
