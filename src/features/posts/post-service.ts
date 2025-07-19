import { HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';

export class PostService {
  static async fetchUserPosts() {
    const res = await http.get('posts/currentuser');
    if (res.status === HTTP_STATUS_CODES.NO_CONTENT) return [];
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data?.data) {
      throw new Error('Failed to fetch user posts. Please try again later.');
    }
    return res.data?.data as Post[];
  }

  static async fetchPosts() {
    const res = await http.get('posts');
    if (res.status === HTTP_STATUS_CODES.NO_CONTENT) return [];
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data.data) {
      throw new Error('Failed to fetch posts. Please try again later.');
    }
    return res.data.data as Post[];
  }
}
