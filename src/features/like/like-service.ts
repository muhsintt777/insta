import { COMMON_ERROR_MESSAGE } from 'configs/constants';
import { http } from 'configs/http';

export class LikeService {
  static async createLike(postId: string) {
    const res = await http.post('likes', { postId });
    if (res.status !== 201) throw new Error(COMMON_ERROR_MESSAGE);
  }

  static async deleteLike(postId: string) {
    const res = await http.delete(`likes/${postId}`);
    if (res.status !== 200) throw new Error(COMMON_ERROR_MESSAGE);
  }
}
