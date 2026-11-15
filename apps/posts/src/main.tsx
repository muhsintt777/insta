import { mount } from './mount';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Posts app root element was not found.');
}

mount(container, {
  surface: 'feed',
  profileImage: null,
});
