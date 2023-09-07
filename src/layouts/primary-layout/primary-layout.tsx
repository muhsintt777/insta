import styles from "./style.module.css";
import { Outlet } from "react-router-dom";
import { Header } from "components/header/header";

export const PrimaryLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <p>primary layout</p>
      <Outlet />
    </div>
  );
};
