import { configureHttp } from '@insta/http';
import { mount } from './mount';

configureHttp({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  onSessionExpired: async () => {},
  onSignedOut: async () => {},
});

const container = document.getElementById('root');

if (!container) {
  throw new Error('Auth app root element was not found.');
}

mount(container, {
  initialPath: '/login',
  initialSessionStatus: 'UNAUTHENTICATED',
});
