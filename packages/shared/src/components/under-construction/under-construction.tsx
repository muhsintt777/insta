import styles from './under-construction.module.scss';
import { ConstructionIcon } from '../../assets/icons/construction-icon';

export const UnderConstruction = () => (
  <div className={styles.container}>
    <ConstructionIcon size="50px" color="grey" />
    <p>Under construction...</p>
  </div>
);