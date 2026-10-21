import styles from './home-page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import {
  CommentsModal,
  LikeService,
  PostCard,
  PostCardSkeleton,
  PostService,
} from 'features/posts';
import { handleErrorWithToast, useToast } from 'features/toast';
import { AddPost } from './components/add-post/add-post';
import { COMMON_ERROR_MESSAGE } from 'shared/constants';
import type { Post } from 'features/posts';

type FeedLoadStatus = 'LOADING' | 'SUCCESS' | 'FAILED';

export const HomePage = () => {
  const { showToast } = useToast();
  const [showLoader, setShowLoader] = useState<FeedLoadStatus>('LOADING');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostIdForComments, setSelectedPostIdForComments] = useState<
    string | null
  >(null);

  const refetchPosts = useCallback(async () => {
    try {
      const result = await PostService.fetchPosts();
      setPosts(result);
    } catch (error) {
      handleErrorWithToast(error, showToast);
    }
  }, [showToast]);

  const handleLike = useCallback(
    async (postId: string, isLiked: boolean) => {
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
        handleErrorWithToast(error, showToast);
      }
    },
    [showToast],
  );

  const openCommentsModal = useCallback((postId: string) => {
    setSelectedPostIdForComments(postId);
  }, []);

  const closeCommentsModal = useCallback(() => {
    setSelectedPostIdForComments(null);
  }, []);

  const updateCommentCount = useCallback(
    (postId: string, type: 'increment' | 'decrement') => {
      setPosts((prev) =>
        prev.map((post) => {
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

  useEffect(() => {
    (async () => {
      try {
        const resut = await PostService.fetchPosts();
        setPosts(resut);
        setShowLoader('SUCCESS');
      } catch (error) {
        handleErrorWithToast(error, showToast);
        setShowLoader('FAILED');
      }
    })();
  }, [showToast]);

  return (
    <div className={styles.container}>
      <AddPost onPostCreated={refetchPosts} />

      {showLoader === 'LOADING' ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : showLoader === 'FAILED' ? (
        <div className="error">{COMMON_ERROR_MESSAGE}</div>
      ) : posts.length === 0 ? (
        <div className="info">No posts to display.</div>
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
          updateCommentCount(selectedPostIdForComments!, 'decrement')
        }
        onSubmit={() =>
          updateCommentCount(selectedPostIdForComments!, 'increment')
        }
      />
    </div>
  );
};
