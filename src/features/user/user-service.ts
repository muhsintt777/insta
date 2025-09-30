import { http } from 'configs/http';
import { HTTP_STATUS_CODES } from 'configs/constants';
import { User } from './user';

interface EditUserProfileParams {
  fullName?: string;
  bio?: string;
}
export class UserService {
  static async fetchCurrentUser(): Promise<User> {
    const res = await http.get('/users/currentuser');
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error('Failed to fetch user details');
    }
    return res.data.data as User;
  }

  static async editUserProfile(params: EditUserProfileParams) {
    console.log('params', params);

    // const res = await http.put('users/currentuser', params);
    // if (res.status !== HTTP_STATUS_CODES.OK) {
    //   throw new Error('Failed to update user profile');
    // }
  }
}
