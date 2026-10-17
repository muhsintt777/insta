import styles from './side-navStyle.module.scss';
import { FriendsIcon } from 'shared/assets/icons/friends-icon';
import { SideNavTab } from './side-navTab';
import { HomeIcon } from 'shared/assets/icons/home-icon';
import { ChatIcon } from 'shared/assets/icons/chat-icon';
import { NotificationsIcon } from 'shared/assets/icons/notifications-icon';

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
