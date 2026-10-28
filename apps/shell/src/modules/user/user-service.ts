import { http } from '@insta/shared/lib/http';
import { HTTP_STATUS_CODES } from '@insta/shared/constants';
import type { EditUserProfileParams, User } from './user-types';

export class UserService {
  static async fetchCurrentUser(): Promise<User> {
    const res = await http.get('/users/currentuser');
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data?.data) {
      throw new Error('Failed to fetch user details');
    }
    return res.data.data as User;
  }

  static async editUserProfile(params: EditUserProfileParams) {
    const res = await http.put('users/currentuser', params);
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error('Failed to update user profile');
    }
  }
}
