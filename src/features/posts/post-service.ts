import { ERROR_TYPE } from 'configs/constants';
import { http } from 'configs/http';
import { CustomError } from 'utils/custom-error';

export class PostService {
  static async fetchUserPosts() {
    const res = await http.get('posts/currentuser');
    if (res.status === 204) return [];
    if (res.status !== 200) {
      throw new CustomError(
        ERROR_TYPE.UNKNOWN_API_ERROR,
        'Fetch user posts failed',
      );
    }
    return res.data?.data as Post[];
  }
}
