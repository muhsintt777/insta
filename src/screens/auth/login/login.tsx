import styles from "./loginStyle.module.scss";
import { TitleHead } from "./title-head";

export const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <TitleHead title="LOGIN" />
      </div>
      <div className={styles.main}>
        <div className={styles.loginBox}>
          <div>
            <p>EMAIL</p>
          </div>
          <div>sso</div>
        </div>
      </div>
    </div>
  );
};
