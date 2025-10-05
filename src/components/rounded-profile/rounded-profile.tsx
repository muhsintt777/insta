import styles from './rounded-profileStyle.module.scss';

import { FC } from 'react';

import profilePicPNG from 'assets/images/profile-pic.png';

interface RoundedProfileProps {
  size?: string;
  imageUrl: string | null;
}

export const RoundedProfile: FC<RoundedProfileProps> = ({
  size = '45px',
  imageUrl,
}) => {
  return (
    <div style={{ width: size, height: size }} className={styles.container}>
      <img src={imageUrl || profilePicPNG} alt="img" />
    </div>
  );
};
