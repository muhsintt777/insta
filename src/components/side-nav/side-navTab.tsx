import styles from "./side-navStyle.module.scss";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { HomeIcon } from "assets/icons-components/home-icon";

interface SideNavTabProps {
  path: string;
  name: string;
}

export const SideNavTab: FC<SideNavTabProps> = ({ path, name }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${styles.tabActive} ${styles.tab}` : styles.tab
      }
    >
      <HomeIcon />
      <p>{name}</p>
    </NavLink>
  );
};
