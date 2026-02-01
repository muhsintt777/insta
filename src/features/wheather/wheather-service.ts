import { HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';

interface Measurement {
  value: number;
  unit: string;
}

type WheatherCode = 'CLEAR_SKY' | 'PARTLY_CLOUDY' | 'CLOUDY' | 'RAIN' | 'SNOW';

export interface Wheather {
  temperature: Measurement;
  windSpeed: Measurement;
  weatherCode: WheatherCode;
  isDay: boolean;
}

export class WheatherService {
  static async fetchCurrentWheather(latitude: number, longitude: number) {
    const res = await http.get(
      `/weather/current?latitude=${latitude}&longitude=${longitude}`,
    );
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error('Failed to fetch wheather details');
    }
    return res.data?.data as Wheather;
  }
}
