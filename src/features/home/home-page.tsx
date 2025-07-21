import styles from './home-page.module.scss';
import { useEffect, useState } from 'react';
import { LoaderStatus } from 'utils/types';
import { PostCard } from 'features/posts/components/post-card';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { PostService } from 'features/posts/post-service';
import { AddPost } from './components/add-post/add-post';
import { PrimaryButton } from 'components/buttons/primary-button';
import { CreatePostModal } from 'features/posts/create-post-modal';

export const HomePage = () => {
  const [showLoader, setShowLoader] = useState<LoaderStatus>('LOADING');
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreatePostModal, setShowCreatePostModal] =
    useState<boolean>(false);
  console.log('showCreatePostModal:', showCreatePostModal);

  const toggleCreatePostModal = () => {
    console.log('shtitt');

    setShowCreatePostModal(!showCreatePostModal);
  };

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
      <AddPost />
      <PrimaryButton
        onClick={toggleCreatePostModal}
        text="Create"
        type="button"
      />
      {showCreatePostModal && (
        <CreatePostModal
          isOpen={showCreatePostModal}
          closeModal={toggleCreatePostModal}
        />
      )}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          caption={post.caption}
          image={post.image}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          fullname={'User Name'} // Replace with actual user name if available
        />
      ))}
    </div>
  );
};
