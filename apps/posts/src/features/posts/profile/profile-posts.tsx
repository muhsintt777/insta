import styles from './profile-posts.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { MFE_EVENT_NAMES } from '@insta/contracts';
import { EventBus } from '@insta/utils';
import { DateUtils } from '@insta/utils/date-utils';
import { CommentsModal } from 'features/posts/comments/comments-modal';
import { EditPostModal } from 'features/posts/forms/edit-post-modal';
import { LikeService } from 'features/posts/api/like-service';
import { PostCard, PostCardSkeleton } from '@insta/ui/posts';
import { PostService } from 'features/posts/api/post-service';
import { emitErrorToast } from 'app/emit-error-toast';
import type { EditPostParams, Post } from 'features/posts/types/post-types';

type ProfilePostsStatus = 'LOADING' | 'SUCCESS' | 'FAILED';

export const ProfilePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<ProfilePostsStatus>('LOADING');
  const [selectedPostToEdit, setSelectedPostToEdit] =
    useState<EditPostParams | null>(null);
  const [selectedPostIdForComments, setSelectedPostIdForComments] = useState<
    string | null
  >(null);

  const deletePost = useCallback(async (postId: string) => {
    try {
      await PostService.deletePost(postId);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== postId),
      );
      EventBus.emit(MFE_EVENT_NAMES.posts.deleted, undefined);
    } catch (error) {
      emitErrorToast(error);
    }
  }, []);

  const editPost = useCallback(async (params: EditPostParams) => {
    try {
      await PostService.editPost(params.postId, params.caption);
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === params.postId
            ? { ...post, caption: params.caption }
            : post,
        ),
      );
    } catch (error) {
      emitErrorToast(error);
    }
  }, []);

  const handleLike = useCallback(async (postId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await LikeService.deleteLike(postId);
      } else {
        await LikeService.createLike(postId);
      }
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !isLiked,
                likeCount: isLiked ? post.likeCount - 1 : post.likeCount + 1,
              }
            : post,
        ),
      );
    } catch (error) {
      emitErrorToast(error);
    }
  }, []);

  const updateCommentCount = useCallback(
    (postId: string, type: 'increment' | 'decrement') => {
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id !== postId) return post;

          return {
            ...post,
            commentCount:
              type === 'increment'
                ? post.commentCount + 1
                : post.commentCount - 1,
          };
        }),
      );
    },
    [],
  );

  const closeEditModal = useCallback(() => {
    setSelectedPostToEdit(null);
  }, []);

  const openEditModal = useCallback((postId: string, caption: string) => {
    setSelectedPostToEdit({ postId, caption });
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await PostService.fetchUserPosts();
        if (active) {
          setPosts(result);
          setStatus('SUCCESS');
        }
      } catch (error) {
        if (active) {
          emitErrorToast(error);
          setStatus('FAILED');
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.container}>
      {status === 'LOADING' ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : status === 'FAILED' ? (
        <p className={styles.status}>Could not load posts.</p>
      ) : posts.length === 0 ? (
        <p className={styles.status}>No posts to display.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            caption={post.caption}
            image={post.image}
            likeCount={post.likeCount}
            userProfileImage={post.creator.profileImage}
            commentCount={post.commentCount}
            dateLabel={DateUtils.formatRelative(
              DateUtils.dateFromIsoString(post.createdAt),
            )}
            fullname={post.creator.fullName}
            isLiked={post.isLiked}
            customStyles={{ marginBottom: '6px' }}
            onComment={() => setSelectedPostIdForComments(post.id)}
            onLike={() => handleLike(post.id, post.isLiked)}
            onEdit={() => openEditModal(post.id, post.caption)}
            onDelete={() => deletePost(post.id)}
          />
        ))
      )}

      <EditPostModal
        closeModal={closeEditModal}
        currentCaption={selectedPostToEdit?.caption ?? ''}
        isOpen={Boolean(selectedPostToEdit?.postId)}
        postId={selectedPostToEdit?.postId ?? ''}
        onSubmit={editPost}
      />
      <CommentsModal
        closeModal={() => setSelectedPostIdForComments(null)}
        isOpen={Boolean(selectedPostIdForComments)}
        postId={selectedPostIdForComments}
        onDelete={() =>
          updateCommentCount(selectedPostIdForComments!, 'decrement')
        }
        onSubmit={() =>
          updateCommentCount(selectedPostIdForComments!, 'increment')
        }
      />
    </div>
  );
};
