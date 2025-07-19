import styles from './homeStyle.module.scss';
import { AddPost } from './components/add-post/add-post';
import { PostCard } from 'features/posts/components/post-card';

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <AddPost />
      <PostCard
        id="1"
        caption="Enjoying the sunset!"
        image="https://placehold.co/600x400"
        likeCount={12}
        commentCount={3}
        createdAt={new Date().toISOString()}
        updatedAt={new Date().toISOString()}
        fullname="John Doe"
      />
      <PostCard
        id="2"
        caption="Had a great lunch with friends."
        image="https://placehold.co/600x400/EEE/31343C"
        likeCount={8}
        commentCount={1}
        createdAt={new Date(Date.now() - 3600 * 1000).toISOString()}
        updatedAt={new Date(Date.now() - 3600 * 1000).toISOString()}
        fullname="Jane Smith"
      />
    </div>
  );
};
