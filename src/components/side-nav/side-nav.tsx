import styles from "./side-navStyle.module.scss";
import { FriendsIcon } from "assets/icons-components/friends-icon";
import { SideNavTab } from "./side-navTab";
import { HomeIcon } from "assets/icons-components/home-icon";
import { ChatIcon } from "assets/icons-components/chat-icon";
import { NotificationsIcon } from "assets/icons-components/notifications-icon";

export const SideNav = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/" name="Home" Icon={HomeIcon} />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/friends" name="Friends" Icon={FriendsIcon} />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/chat" name="Chat" Icon={ChatIcon} />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab
          path="/notifications"
          name="Notifications"
          Icon={NotificationsIcon}
        />
      </div>
    </nav>
  );
};
