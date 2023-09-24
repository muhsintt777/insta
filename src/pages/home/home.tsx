import styles from "./homeStyle.module.scss";
import { Post } from "./components/post/post";

export const Home = () => {
  return (
    <div>
      <div className={styles.postWrap}>
        <Post />
      </div>
    </div>
  );
};
