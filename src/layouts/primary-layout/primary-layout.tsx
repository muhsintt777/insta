import styles from "./style.module.css";
import { Outlet } from "react-router-dom";

export const PrimaryLayout = () => {
  return (
    <div className={styles.container}>
      <p>primary layout</p>
      <Outlet />
    </div>
  );
};
