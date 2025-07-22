import styles from './primary-modal.module.scss';
import { FC, ReactElement } from 'react';
import { Modal } from '@mui/material';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { CloseIcon } from 'assets/icons-components/close-icon';
import { PrimaryButton } from 'components/buttons/primary-button';
import { SecondaryButton } from 'components/buttons/secondary-button';

interface PrimaryModalProps {
  children: ReactElement;
  isOpen: boolean;
  closeModal?: () => void;
}
interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

interface ModalFooterProps {
  primaryButton?: {
    text: string;
    showLoader?: boolean;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick?: () => void;
  };
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
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
      }}
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

export const ModalFooter: FC<ModalFooterProps> = ({
  primaryButton,
  secondaryButton,
}) => {
  return (
    <div className={styles.footer}>
      {secondaryButton && (
        <SecondaryButton onClick={secondaryButton.onClick}>
          {secondaryButton.text}
        </SecondaryButton>
      )}
      {primaryButton && (
        <PrimaryButton
          customStyles={secondaryButton ? { marginLeft: '12px' } : undefined}
          text={primaryButton.text}
          showLoader={primaryButton.showLoader}
          onClick={primaryButton.onClick}
        />
      )}
    </div>
  );
};
