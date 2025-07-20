import styles from './primary-modal.module.scss';
import { FC, ReactElement } from 'react';
import { Modal } from '@mui/material';

interface PrimaryModalProps {
  children: ReactElement;
  isOpen: boolean;
  closeModal?: () => void;
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
