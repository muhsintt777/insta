import { FriendsIcon } from "assets/icons-components/friends-icon";
import styles from "./side-navStyle.module.scss";
import { SideNavTab } from "./side-navTab";
import { HomeIcon } from "assets/icons-components/home-icon";
import { ChatIcon } from "assets/icons-components/chat-icon";
import { NotificationsIcon } from "assets/icons-components/notifications-icon";

export const SideNav = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/" name="Home" icon={<HomeIcon />} />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/friends" name="Friends" icon={<FriendsIcon />} />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab path="/chat" name="Chat" icon={<ChatIcon />} />
      </div>
      <div className={styles.navTabWrap}>
        <SideNavTab
          path="/notifications"
          name="Notifications"
          icon={<NotificationsIcon />}
        />
      </div>
    </nav>
  );
};
