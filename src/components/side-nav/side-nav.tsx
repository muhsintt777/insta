import styles from "./side-navStyle.module.scss";
import { SideNavTab } from "./side-navTab";

export const SideNav = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/" name="Home" />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/one" name="One" />
      </div>
    </nav>
  );
};
