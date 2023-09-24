import styles from "./side-navStyle.module.scss";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
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
  const [isActive, setIsActive] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        setIsActive(isActive);
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
