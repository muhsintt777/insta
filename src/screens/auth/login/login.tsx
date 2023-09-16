import styles from "./loginStyle.module.scss";
import { TitleHead } from "./title-head";

export const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <TitleHead title="LOGIN" />
      </div>
    </div>
  );
};
