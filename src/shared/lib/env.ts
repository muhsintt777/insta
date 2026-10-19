export const ENV: ENVType = {
  SERVER_TYPE: 'DEV',
  API_URL: 'http://localhost:4000/api',
};

interface ENVType {
  SERVER_TYPE: 'DEV' | 'PROD';
  API_URL: string;
}
