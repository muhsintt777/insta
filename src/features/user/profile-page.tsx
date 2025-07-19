import styles from './profile-page.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux-hooks';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { AppBar } from 'components/app-bar/app-bar';
import { SectionHeader } from 'components/headers/section-header';
import { addMultipleClassNames } from 'utils/common';
import { handleErrorWithToast } from 'features/toast/handle-error-with-toast';
import { PostService } from 'features/posts/post-service';
import { selectUser } from './user-slice';
import {
  PostCard,
  PostCardSkeleton,
} from 'features/posts/components/post-card';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const userDetails = useAppSelector(selectUser).details!;
  const [posts, setPosts] = useState<Post[]>([]);
  const [postLoader, setPostLoader] = useState<boolean>(true);

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
      <div
        className={addMultipleClassNames(styles.appBarWrap, 'app-container')}
      >
        <AppBar title="PROFILE" onBackClick={() => navigate(-1)} />
      </div>
      <div className={addMultipleClassNames(styles.body, 'app-container')}>
        <div className={styles.userDetailsSection}>
          <RoundedProfile size="100px" />
          <div className={styles.userDetails}>
            <p className={styles.name}>{userDetails.fullName}</p>
            <p className={styles.stats}>0 posts | 0 friends</p>
            {userDetails.bio && <p className={styles.bio}>{userDetails.bio}</p>}
            {!userDetails.bio && <p className={styles.addBio}>Add bio...</p>}
          </div>
        </div>
        <SectionHeader
          style={{ marginTop: '8px', marginBottom: '8px' }}
          title="POSTS"
        />

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
    </div>
  );
};
