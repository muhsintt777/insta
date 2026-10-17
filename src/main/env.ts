export const ENV:ENVType = {
  SERVER_TYPE: 'DEV',
  API_URL: 'https://insta-server-k0gd.onrender.com/api',
};

interface ENVType {
  SERVER_TYPE: 'DEV' | 'PROD';
  API_URL: string;
}
