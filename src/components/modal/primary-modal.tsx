import { CSSProperties, FC, ReactElement } from 'react';
import { Modal } from '@mui/material';
import { colors } from 'main/global-style';

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
    <Modal open={isOpen} onClose={closeModal} sx={styles.modal}>
      <div style={styles.container}>{children}</div>
    </Modal>
  );
};

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: colors.LIGHTGREY,
    borderRadius: '8px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
