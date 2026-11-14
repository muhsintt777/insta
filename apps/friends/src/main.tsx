import { mount } from './mount';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Friends app root element was not found.');
}

mount(container);
