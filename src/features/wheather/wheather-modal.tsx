import styles from './wheather-modal.module.scss';
import { FC, useEffect, useState } from 'react';
import {
  ModalFooter,
  ModalHeader,
  PrimaryModal,
} from 'components/modals/primary-modal';
import { WheatherIcon } from 'assets/icons-components/wheather-icon';
import { Wheather, WheatherService } from './wheather-service';
import { useGeolocation } from 'features/geolocation/use-geolocation';
import { CircleLoader } from 'features/loader/Circle-loader';

interface WheatherModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const WheatherModal: FC<WheatherModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [wheather, setWheather] = useState<Wheather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useGeolocation();

  useEffect(() => {
    if (wheather || !isOpen || !location.latitude || !location.longitude)
      return;

    (async () => {
      try {
        setIsLoading(true);
        const result = await WheatherService.fetchCurrentWheather(
          location.latitude!,
          location.longitude!,
        );
        setWheather(result);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isOpen, wheather, location]);

  return (
    <PrimaryModal isOpen={isOpen} closeModal={closeModal}>
      <>
        <ModalHeader title="Weather Information" onClose={closeModal} />
        <div className={styles.body}>
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <CircleLoader size="large" />
            </div>
          ) : (
            <>
              <div className={styles.weatherIcon}>
                <WheatherIcon size="48px" color="var(--clr-yellow)" />
              </div>

              <p className={styles.condition}>{wheather?.weatherCode}</p>
              <p className={styles.location}>{'location'}</p>

              <div className={styles.temperatureSection}>
                <span className={styles.temperature}>
                  {wheather?.temperature.value}
                  <span className={styles.degree}>
                    {wheather?.temperature.unit}
                  </span>
                </span>

                <div className={styles.tempRange}>
                  <span className={styles.minTemp}>
                    <span className={styles.arrow}>↓</span>
                    {'min temp'}°
                  </span>
                  <span className={styles.maxTemp}>
                    <span className={styles.arrow}>↑</span>
                    {'max temp'}°
                  </span>
                </div>
              </div>

              <div className={styles.statsSection}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Humidity</span>
                  <span className={styles.statValue}>{'na'}%</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Rainfall</span>
                  <span className={styles.statValue}>{'na'} mm</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Gusture</span>
                  <span className={styles.statValue}>{'na'} km/h</span>
                </div>
              </div>
            </>
          )}
        </div>
        <ModalFooter
          primaryButton={{
            text: 'Close',
            onClick: closeModal,
          }}
        />
      </>
    </PrimaryModal>
  );
};
