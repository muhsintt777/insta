import styles from './comments-modal.module.scss';
import { FC, useEffect, useState } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PrimaryModal,
  ModalHeader,
  ModalFooter,
} from 'components/modals/primary-modal';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { any } from 'zod';
import { CommentCard } from './comment-card';
import { LoaderStatus } from 'utils/types';

interface CommentsModalProps {
  closeModal: () => void;
  isOpen: boolean;
  postId: string | null;
}

export const CommentsModal: FC<CommentsModalProps> = ({
  isOpen,
  closeModal,
  postId,
}) => {
  const [screenStatus, setScreenStatus] = useState<LoaderStatus>('IDLE');

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      caption: '',
    },
  });

  useEffect(() => {
    (async () => {
      try {
        setScreenStatus('LOADING');

        //
      } catch (error) {
        //
        setScreenStatus('FAILED');
        handleErrorWithToast(error);
      }
    })();
  }, []);

  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="COMMENTS" onClose={closeModal} />
        <div className={styles.body}>
          <CommentCard
            customStyle={{ marginBottom: '8px' }}
            authorName="john"
            authorProfilePic=""
            commentText="sa aioj afojeofi aojo"
            commentedAt=""
          />
          <CommentCard
            authorName="elsa"
            authorProfilePic=""
            commentText="rgdgr gdgdrg  sdgr"
            commentedAt=""
          />
        </div>
        <ModalFooter
          secondaryButton={{ onClick: closeModal, text: 'CANCEL' }}
          primaryButton={{
            text: 'COMMENT',
            showLoader: false,
            onClick: handleSubmit(() => {}),
          }}
        />
      </>
    </PrimaryModal>
  );
};
