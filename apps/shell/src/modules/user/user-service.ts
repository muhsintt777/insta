import { http } from '@insta/http';
import { HTTP_STATUS_CODES } from '@insta/http';
import type { User } from './user-types';

export class UserService {
  static async fetchCurrentUser(): Promise<User> {
    const res = await http.get('/users/currentuser');
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data?.data) {
      throw new Error('Failed to fetch user details');
    }
    return res.data.data as User;
  }
}
