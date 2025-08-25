import styles from './profile-page.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { AppBar } from 'components/app-bar/app-bar';
import { addMultipleClassNames } from 'utils/common';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { PostService } from 'features/posts/post-service';
import { useLoader } from 'features/loader/useLoader';
import { selectUser } from './user-slice';
import {
  PostCard,
  PostCardSkeleton,
} from 'features/posts/components/post-card';
import { EditPostModal } from 'features/posts/edit-post-modal';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const userDetails = useAppSelector(selectUser).details!;
  const { showGlobalBackdrop, hideGlobalBackdrop } = useLoader();

  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoader, setPostLoader] = useState<boolean>(true);
  const [selectedPostToEdit, setSelectedPostToEdit] =
    useState<EditPostParams | null>(null);

  const deletePost = useCallback(
    async (postId: string) => {
      try {
        showGlobalBackdrop();
        await PostService.deletePost(postId);
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        handleErrorWithToast(error);
      } finally {
        hideGlobalBackdrop();
      }
    },
    [showGlobalBackdrop, hideGlobalBackdrop],
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
    <div className={addMultipleClassNames(styles.container, 'app-container')}>
      <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
      <div className={addMultipleClassNames(styles.body)}>
        <div className={styles.userDetailsSection}>
          <RoundedProfile size="100px" />
          <div className={styles.userDetails}>
            <p className={styles.name}>{userDetails.fullName}</p>
            <p className={styles.stats}>0 posts | 0 friends</p>
            {userDetails.bio && <p className={styles.bio}>{userDetails.bio}</p>}
            {!userDetails.bio && <p className={styles.addBio}>Add bio...</p>}
          </div>
        </div>

        {postLoader ? (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>
            No posts to display.
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              onEdit={() => openEditModal(post.id, post.caption)}
              onDelete={() => deletePost(post.id)}
              customStyles={{ marginBottom: '6px' }}
              id={post.id}
              caption={post.caption}
              commentCount={post.commentCount}
              createdAt={post.createdAt}
              image={post.image}
              likeCount={post.likeCount}
              updatedAt={post.updatedAt}
              fullname="name"
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
    </div>
  );
};
