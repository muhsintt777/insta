import styles from './primary-modal.module.scss';
import { FC, ReactElement } from 'react';
import { Modal } from '@mui/material';
import { PrimaryIconButton } from 'components/primary-icon-button/primary-icon-button';
import { CloseIcon } from 'assets/icons-components/close-icon';
import { PrimaryButton } from 'components/primary-button/primary-button';

interface PrimaryModalProps {
  children: ReactElement;
  isOpen: boolean;
  closeModal?: () => void;
}
interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export const PrimaryModal: FC<PrimaryModalProps> = ({
  children,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className={styles.modalContainer}>{children}</div>
    </Modal>
  );
};

export const ModalHeader: FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className={styles.header}>
      <p>{title}</p>
      <PrimaryIconButton onClick={onClose}>
        <CloseIcon />
      </PrimaryIconButton>
    </div>
  );
};

export const ModalFooter = () => {
  return (
    <div className={styles.footer}>
      <PrimaryButton text="sefe" />
    </div>
  );
};
