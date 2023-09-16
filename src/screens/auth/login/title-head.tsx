import { FC } from "react";
import styles from "./title-headStyle.module.scss";

interface TitleHeadProps {
  title: string;
}

export const TitleHead: FC<TitleHeadProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
    </div>
  );
};
