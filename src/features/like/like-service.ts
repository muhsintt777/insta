import { http } from 'configs/http';

export class LikeService {
  static async createLike(postId: string) {
    const res = await http.post('likes', { postId });
    if (res.status !== 201) throw new Error('Something went wrong!');
  }

  static async deleteLike(postId: string) {
    const res = await http.delete(`likes/${postId}`);
    if (res.status !== 200) throw new Error('Something went wrong!');
  }
}
