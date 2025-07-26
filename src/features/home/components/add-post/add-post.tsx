import styles from './add-postStyle.module.scss';
import { useState } from 'react';

import { SendIcon } from 'assets/icons-components/send-icon';
import { RoundedProfile } from 'components/rounded-profile/rounded-profile';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';

export const AddPost = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <RoundedProfile />
        <div>
          <input type="text" placeholder="What's on your mind ? <username>" />
          <PrimaryIconButton type="submit">
            <SendIcon size="12px" color="var(--clr-grey)" />
          </PrimaryIconButton>
        </div>
      </div>
    </div>
  );
};
