import styles from "./homeStyle.module.scss";
import { Post } from "./components/post/post";
import { AddPost } from "./components/add-post/add-post";

export const Home = () => {
  return (
    <div className={styles.container}>
      <AddPost />
      <div className={styles.postWrap}>
        <Post />
      </div>
      <div className={styles.postWrap}>
        <Post />
      </div>
    </div>
  );
};
