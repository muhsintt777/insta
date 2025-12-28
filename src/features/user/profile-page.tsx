import styles from './profile-page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { EditIcon } from 'assets/icons-components/edit-icon';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { AppBar } from 'components/app-bar/app-bar';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { PostService } from 'features/posts/post-service';
import { useLoader } from 'features/loader/useLoader';
import { selectUser, userActions } from './user-slice';
import {
  PostCard,
  PostCardSkeleton,
} from 'features/posts/components/post-card';
import { EditPostModal } from 'features/posts/edit-post-modal';
import { LikeService } from 'features/like/like-service';
import { CommentsModal } from 'features/comment/comments-modal';
import { EditUserModal } from './edit-user-modal';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(selectUser).details!;
  const { showGlobalBackdrop, hideGlobalBackdrop } = useLoader();

  const [posts, setPosts] = useState<Post[]>([]);
  const [showUserEditModal, setShowUserEditModal] = useState(false);
  const [postLoader, setPostLoader] = useState<boolean>(true);
  const [selectedPostToEdit, setSelectedPostToEdit] =
    useState<EditPostParams | null>(null);

  const [selectedPostIdForComments, setSelectedPostIdForComments] = useState<
    string | null
  >(null);

  const deletePost = useCallback(
    async (postId: string) => {
      try {
        showGlobalBackdrop();
        await PostService.deletePost(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        dispatch(
          userActions.updateUserResourceCount({
            type: 'decreament',
            key: 'postCount',
          }),
        );
      } catch (error) {
        handleErrorWithToast(error);
      } finally {
        hideGlobalBackdrop();
      }
    },
    [showGlobalBackdrop, hideGlobalBackdrop, dispatch],
  );

  const editPost = useCallback(
    async (param: EditPostParams) => {
      try {
        showGlobalBackdrop();
        await PostService.editPost(param.postId, param.caption);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === param.postId
              ? { ...post, caption: param.caption }
              : post,
          ),
        );
      } catch (error) {
        handleErrorWithToast(error);
      } finally {
        hideGlobalBackdrop();
      }
    },
    [hideGlobalBackdrop, showGlobalBackdrop],
  );

  const closeEditModal = useCallback(() => {
    setSelectedPostToEdit(null);
  }, []);

  const openEditModal = useCallback((postId: string, caption: string) => {
    setSelectedPostToEdit({ postId, caption });
  }, []);

  const toggleUserEditModal = useCallback(() => {
    setShowUserEditModal((prev) => !prev);
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
        const result = await PostService.fetchUserPosts();
        setPosts(result);
      } catch (error) {
        handleErrorWithToast(error);
      } finally {
        setPostLoader(false);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
      <div className={styles.body}>
        <div className={styles.userDetailsSection}>
          <RoundedProfile imageUrl={userDetails.profileImage} size="100px" />
          <div className={styles.userDetails}>
            <p className={styles.name}>{userDetails.fullName}</p>
            <p className={styles.stats}>
              {userDetails.postCount} posts | {userDetails.friendsCount} friends
            </p>
            {userDetails.bio && <p className={styles.bio}>{userDetails.bio}</p>}
            {!userDetails.bio && <p className={styles.addBio}>Add bio...</p>}
          </div>
          <div className={styles.editIconWrap}>
            <PrimaryIconButton onClick={toggleUserEditModal}>
              <EditIcon />
            </PrimaryIconButton>
          </div>
        </div>

        {postLoader ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : posts.length === 0 ? (
          <p className="info">No posts to display.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              onComment={() => openCommentsModal(post.id)}
              onLike={() => handleLike(post.id, post.isLiked)}
              onEdit={() => openEditModal(post.id, post.caption)}
              onDelete={() => deletePost(post.id)}
              customStyles={{ marginBottom: '6px' }}
              userProfileImage={post.creator.profileImage}
              caption={post.caption}
              commentCount={post.commentCount}
              createdAt={post.createdAt}
              image={post.image}
              likeCount={post.likeCount}
              fullname={post.creator.fullName}
              isLiked={post.isLiked}
              key={post.id}
            />
          ))
        )}
      </div>
      <EditPostModal
        closeModal={closeEditModal}
        currentCaption={selectedPostToEdit?.caption || ''}
        isOpen={Boolean(selectedPostToEdit?.postId)}
        postId={selectedPostToEdit?.postId || ''}
        onSubmit={editPost}
      />
      <CommentsModal
        onSubmit={() =>
          updateCommentCount(selectedPostIdForComments!, 'increament')
        }
        closeModal={closeCommentsModal}
        isOpen={Boolean(selectedPostIdForComments)}
        postId={selectedPostIdForComments}
        onDelete={() =>
          updateCommentCount(selectedPostIdForComments!, 'decreament')
        }
      />
      <EditUserModal
        isOpen={showUserEditModal}
        closeModal={toggleUserEditModal}
      />
    </div>
  );
};
