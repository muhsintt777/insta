import { useState, useEffect } from 'react';

export type GeolocationStatus =
  | 'LOADING'
  | 'SUCCESS'
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'NOT_SUPPORTED';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  status: GeolocationStatus;
}

const ERROR_CODE_MAP: Record<number, GeolocationStatus> = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    status: 'LOADING',
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        status: 'NOT_SUPPORTED',
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          status: 'SUCCESS',
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          status: ERROR_CODE_MAP[error.code] ?? 'POSITION_UNAVAILABLE',
        }));
      },
    );
  }, []);

  return location;
};
