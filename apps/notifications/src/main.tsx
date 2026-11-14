import { mount } from './mount';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Notifications app root element was not found.');
}

mount(container);
