import styles from "./side-navStyle.module.scss";
import { FC } from "react";
import { NavLink } from "react-router-dom";

interface SideNavTabProps {
  path: string;
  name: string;
  icon: JSX.Element;
}

export const SideNavTab: FC<SideNavTabProps> = ({ path, name, icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${styles.tabActive} ${styles.tab}` : styles.tab
      }
    >
      {icon}
      <p>{name}</p>
    </NavLink>
  );
};
