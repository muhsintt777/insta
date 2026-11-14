import { mount } from './mount';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Chat app root element was not found.');
}

mount(container);
