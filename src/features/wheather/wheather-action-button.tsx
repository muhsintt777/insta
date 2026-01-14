import styles from './wheather-action-button.module.scss';
import { memo, useState } from 'react';
import { WheatherIcon } from 'assets/icons-components/wheather-icon';
import { PrimaryIconButton } from 'components/buttons/primary-icon-button';
import { WheatherModal } from './wheather-modal';

export const WheatherActionButtonComp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={styles.container}>
      <PrimaryIconButton type="button" onClick={openModal} aria-label="Weather">
        <WheatherIcon size="24px" />
      </PrimaryIconButton>
      <WheatherModal isOpen={isModalOpen} closeModal={closeModal} />
    </section>
  );
};

export const WheatherActionButton = memo(WheatherActionButtonComp);
