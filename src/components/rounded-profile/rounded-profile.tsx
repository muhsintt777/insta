import styles from './rounded-profileStyle.module.scss';

import { FC } from 'react';

import { IMAGES } from 'assets/images';

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
      <img src={imageUrl || IMAGES.PROFILE_PIC} alt="img" />
    </div>
  );
};
