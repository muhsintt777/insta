import styles from "./notificationsStyle.module.scss";
import { ConstructionIcon } from "assets/icons-components/construction-icon";

export const Notifications = () => {
  return (
    <div className={styles.container}>
      <ConstructionIcon size="50px" color="grey" />
      <p>Under construction...</p>
    </div>
  );
};
