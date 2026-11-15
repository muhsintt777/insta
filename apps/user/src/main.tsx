import { mount } from './mount';

const container = document.getElementById('root');

if (!container) {
  throw new Error('User app root element was not found.');
}

mount(container, {
  user: {
    bio: '',
    gender: null,
    mobileNo: null,
    email: '',
    username: '',
    fullName: 'Preview User',
    profileImage: null,
    postCount: 0,
    friendsCount: 0,
    createdAt: '',
    updatedAt: '',
    id: 'preview',
  },
});
