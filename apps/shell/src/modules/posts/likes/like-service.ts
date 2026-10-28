import { COMMON_ERROR_MESSAGE, HTTP_STATUS_CODES } from '@insta/shared/constants';
import { http } from '@insta/shared/lib/http';

export class LikeService {
  static async createLike(postId: string) {
    const res = await http.post('likes', { postId });
    if (res.status !== HTTP_STATUS_CODES.CREATED) {
      throw new Error(COMMON_ERROR_MESSAGE);
    }
  }

  static async deleteLike(postId: string) {
    const res = await http.delete(`likes/${postId}`);
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error(COMMON_ERROR_MESSAGE);
    }
  }
}
