import styles from "./homeStyle.module.scss";
import { Post } from "./components/post/post";

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.postWrap}>
        <Post />
      </div>
      <div className={styles.postWrap}>
        <Post />
      </div>
    </div>
  );
};
