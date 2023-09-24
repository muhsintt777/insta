import styles from "./postStyle.module.scss";

export const Post = () => {
  return (
    <article className={styles.container}>
      <div className={styles.head}>
        <div>img</div>
        <div>
          <p>name</p>
          <p>time ago</p>
        </div>
        <div>icon</div>
      </div>
      <div className={styles.content}>content</div>
      <div className={styles.action}>actioon</div>
    </article>
  );
};
