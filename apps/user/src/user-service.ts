import { HTTP_STATUS_CODES, http } from '@insta/http';
import type { Post } from '@insta/contracts';
import type { EditUserProfileParams } from './user-types';

export class UserService {
  static async fetchUserPosts(): Promise<Post[]> {
    const res = await http.get('posts/currentuser');
    if (res.status === HTTP_STATUS_CODES.NO_CONTENT) return [];
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data?.data) {
      throw new Error('Failed to fetch user posts. Please try again later.');
    }
    return res.data.data as Post[];
  }

  static async editUserProfile(params: EditUserProfileParams) {
    const res = await http.put('users/currentuser', params);
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error('Failed to update user profile');
    }
  }
}
