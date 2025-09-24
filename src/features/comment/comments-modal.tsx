import styles from './comments-modal.module.scss';
import { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrimaryModal, ModalHeader } from 'components/modals/primary-modal';
import { PrimaryButton } from 'components/buttons/primary-button';
import { FormField } from 'components/input-field/form-field';
import { LoaderStatus } from 'utils/types';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { CircleLoader } from 'features/loader/Circle-loader';
import { CommentService } from './comment-service';
import { CommentCard } from './comment-card';
import { commentFormSchema, CommentFormSchema } from './comment-validation';

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
  const [showCommentLoader, setShowCommentLoader] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
  });

  const onCommentSubmit = async (data: CommentFormSchema) => {
    try {
      if (!postId || screenStatus !== 'SUCCESS' || showCommentLoader) return;
      setShowCommentLoader(true);
      await CommentService.createComment(postId, data.comment);
      const newComment = await CommentService.listPostComments(postId);
      setComments(newComment);
      reset();
    } catch (error) {
      handleErrorWithToast(error);
    } finally {
      setShowCommentLoader(false);
    }
  };

  const onDeleteComment = async (commentId: string) => {
    try {
      if (!postId) return;
      await CommentService.deleteComment(commentId);
      const updatedComments = await CommentService.listPostComments(postId);
      setComments(updatedComments);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    (async () => {
      if (!postId) return;
      try {
        setScreenStatus('LOADING');
        const result = await CommentService.listPostComments(postId);
        setComments(result);
        setScreenStatus('SUCCESS');
      } catch (error) {
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
          {screenStatus === 'LOADING' && (
            <div className={styles.screenStatusWrap}>
              <CircleLoader />
            </div>
          )}
          {screenStatus === 'FAILED' && (
            <div className={styles.screenStatusWrap}>
              {' '}
              <p>Failed to load comments</p>{' '}
            </div>
          )}
          {screenStatus === 'SUCCESS' && comments.length === 0 && (
            <div className={styles.screenStatusWrap}>
              <p>No comments yet</p>
            </div>
          )}
          {screenStatus === 'SUCCESS' && (
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  commentId={comment.id}
                  commentText={comment.content}
                  authorName={comment.creator.username}
                  authorProfilePic={comment.creator.profileImage}
                  commentedAt={comment.createdAt}
                  onDelete={() => onDeleteComment(comment.id)}
                />
              ))}
            </div>
          )}
        </div>
        <form
          className={styles.footer}
          onSubmit={handleSubmit(onCommentSubmit)}
        >
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <FormField
                label="..."
                customStyles={{ flex: 1 }}
                error={errors.comment?.message || null}
                name="comment"
                placeholder="Add a comment..."
                controls={{
                  type: 'TEXT',
                  value: field.value,
                  onchange: field.onChange,
                }}
              />
            )}
          />
          <PrimaryButton
            text="SEND"
            type="submit"
            showLoader={showCommentLoader}
          />
        </form>
      </>
    </PrimaryModal>
  );
};
