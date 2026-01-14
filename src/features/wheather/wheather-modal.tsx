import {
  ModalFooter,
  ModalHeader,
  PrimaryModal,
} from 'components/modals/primary-modal';
import { FC } from 'react';
import { WheatherIcon } from 'assets/icons-components/wheather-icon';
import styles from './wheather-modal.module.scss';

interface WheatherModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface WeatherData {
  condition: string;
  location: string;
  temperature: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  rainfall: number;
  gusture: number;
}

// Mock data - replace with actual API data
const mockWeatherData: WeatherData = {
  condition: 'Partly Cloudy',
  location: 'Bay Area, San Francisco',
  temperature: 18.3,
  minTemp: 14.0,
  maxTemp: 20.0,
  humidity: 74,
  rainfall: 0,
  gusture: 3,
};

export const WheatherModal: FC<WheatherModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const weather = mockWeatherData;

  return (
    <PrimaryModal isOpen={isOpen} closeModal={closeModal}>
      <>
        <ModalHeader title="Weather Information" onClose={closeModal} />
        <div className={styles.body}>
          <div className={styles.weatherIcon}>
            <WheatherIcon size="48px" color="var(--clr-yellow)" />
          </div>

          <p className={styles.condition}>{weather.condition}</p>
          <p className={styles.location}>{weather.location}</p>

          <div className={styles.temperatureSection}>
            <span className={styles.temperature}>
              {weather.temperature}
              <span className={styles.degree}>°</span>
            </span>

            <div className={styles.tempRange}>
              <span className={styles.minTemp}>
                <span className={styles.arrow}>↓</span>
                {weather.minTemp.toFixed(1)}°
              </span>
              <span className={styles.maxTemp}>
                <span className={styles.arrow}>↑</span>
                {weather.maxTemp.toFixed(1)}°
              </span>
            </div>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Humidity</span>
              <span className={styles.statValue}>{weather.humidity}%</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Rainfall</span>
              <span className={styles.statValue}>{weather.rainfall} mm</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Gusture</span>
              <span className={styles.statValue}>{weather.gusture} km/h</span>
            </div>
          </div>

          <button type="button" className={styles.forecastButton}>
            Today Forecast
          </button>
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
