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
import { CommentService } from './comment-service';

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
  const [comments, setComments] = useState<CommentDetails[]>([]);

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
      if (!postId) return;
      try {
        setScreenStatus('LOADING');
        const result = await CommentService.listPostComments(postId);
        setComments(result);
        setScreenStatus('SUCCESS');
      } catch (error) {
        //
        setScreenStatus('FAILED');
        handleErrorWithToast(error);
      }
    })();
  }, [postId]);

  return (
    <PrimaryModal isOpen={isOpen}>
      <>
        <ModalHeader title="COMMENTS" onClose={closeModal} />
        <div className={styles.body}>
          {screenStatus === 'LOADING' && <p>Loading...</p>}
          {screenStatus === 'FAILED' && <p>Failed to load comments</p>}
          {screenStatus === 'SUCCESS' && comments.length === 0 && (
            <p>No comments yet</p>
          )}
          {screenStatus === 'SUCCESS' && comments.length > 0 && (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  commentText={comment.content}
                  authorName={comment.creator.username}
                  authorProfilePic={comment.creator.profileImage}
                  commentedAt={comment.createdAt}
                />
              ))}
            </div>
          )}
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
