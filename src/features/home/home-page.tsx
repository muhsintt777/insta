import styles from './home-page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { LoaderStatus } from 'utils/types';
import {
  PostCard,
  PostCardSkeleton,
} from 'features/posts/components/post-card';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { PostService } from 'features/posts/post-service';
import { LikeService } from 'features/like/like-service';
import { CommentsModal } from 'features/comment/comments-modal';
import { AddPost } from './components/add-post/add-post';
import { COMMON_ERROR_MESSAGE } from 'configs/constants';

export const HomePage = () => {
  const [showLoader, setShowLoader] = useState<LoaderStatus>('LOADING');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostIdForComments, setSelectedPostIdForComments] = useState<
    string | null
  >(null);

  const refetchPosts = useCallback(async () => {
    try {
      const result = await PostService.fetchPosts();
      setPosts(result);
    } catch (error) {
      //
    }
  }, []);

  const handleLike = useCallback(async (postId: string, isLiked: boolean) => {
    try {
      if (isLiked) {
        await LikeService.deleteLike(postId);
      } else {
        await LikeService.createLike(postId);
      }
      setPosts((prev) =>
        prev.map((post) =>
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
      //
    }
  }, []);

  const openCommentsModal = useCallback((postId: string) => {
    setSelectedPostIdForComments(postId);
  }, []);

  const closeCommentsModal = useCallback(() => {
    setSelectedPostIdForComments(null);
  }, []);

  const updateCommentCount = useCallback(
    (postId: string, type: 'increament' | 'decreament') => {
      setPosts((prev) =>
        prev.map((post) => {
          if (post.id !== postId) return post;

          if (type === 'increament') {
            post.commentCount = post.commentCount + 1;
          } else {
            post.commentCount = post.commentCount - 1;
          }
          return post;
        }),
      );
    },
    [],
  );

  useEffect(() => {
    (async () => {
      try {
        const resut = await PostService.fetchPosts();
        setPosts(resut);
        setShowLoader('SUCCESS');
      } catch (error) {
        handleErrorWithToast(error);
        setShowLoader('FAILED');
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <AddPost onPostCreated={refetchPosts} />

      {showLoader === 'LOADING' ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : posts.length === 0 ? (
        <div className="info">No posts to display.</div>
      ) : showLoader === 'FAILED' ? (
        <div className="error">{COMMON_ERROR_MESSAGE}</div>
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
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            fullname={post.creator.fullName}
            isLiked={post.isLiked}
            onComment={() => openCommentsModal(post.id)}
            onLike={() => handleLike(post.id, post.isLiked)}
          />
        ))
      )}

      <CommentsModal
        closeModal={closeCommentsModal}
        isOpen={Boolean(selectedPostIdForComments)}
        postId={selectedPostIdForComments}
        onDelete={() =>
          updateCommentCount(selectedPostIdForComments!, 'decreament')
        }
        onSubmit={() =>
          updateCommentCount(selectedPostIdForComments!, 'increament')
        }
      />
    </div>
  );
};
