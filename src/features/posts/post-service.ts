import { ERROR_TYPE, HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';
import { CustomError } from 'utils/custom-error';

export class PostService {
  static async fetchUserPosts() {
    const res = await http.get('posts/currentuser');
    if (res.status === HTTP_STATUS_CODES.NO_CONTENT) return [];
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new CustomError(
        ERROR_TYPE.UNKNOWN_API_ERROR,
        'Fetch user posts failed',
      );
    }
    return res.data?.data as Post[];
  }
}
