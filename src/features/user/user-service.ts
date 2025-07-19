import { http } from 'configs/http';
import { HTTP_STATUS_CODES } from 'configs/constants';
import { User } from './user';

export class UserService {
  static async fetchCurrentUser(): Promise<User> {
    const res = await http.get('/users/currentuser');
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error('Failed to fetch user details');
    }
    return res.data.data as User;
  }
}
