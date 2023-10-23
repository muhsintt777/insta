import styles from "./side-navStyle.module.scss";
import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { IconsProps } from "utils/types";

const customStyle = {
  activeColor: "var(--clr-black)",
  inactiveColor: "var(--clr-grey)",
};

interface SideNavTabProps {
  path: string;
  name: string;
  Icon: FC<IconsProps>;
}

export const SideNavTab: FC<SideNavTabProps> = ({ path, name, Icon }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === path) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentPath, path]);

  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return isActive ? `${styles.tabActive} ${styles.tab}` : styles.tab;
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Icon
        color={
          isActive || isHovering
            ? customStyle.activeColor
            : customStyle.inactiveColor
        }
      />
      <p
        style={
          isActive || isHovering
            ? { color: customStyle.activeColor }
            : { color: customStyle.inactiveColor }
        }
      >
        {name}
      </p>
    </NavLink>
  );
};
