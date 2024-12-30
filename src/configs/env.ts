export const ENV = {
  SERVER_TYPE: (import.meta.env.VITE_SERVER_TYPE as 'DEV') || 'PROD',
  API_URL: import.meta.env.VITE_API_URL as string,
};
