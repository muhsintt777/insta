export const ENV:ENVType = {
  SERVER_TYPE: 'PROD',
  API_URL: 'https://insta-server-prod.onrender.com/api',
};

interface ENVType {
  SERVER_TYPE: 'DEV' | 'PROD';
  API_URL: string;
}
