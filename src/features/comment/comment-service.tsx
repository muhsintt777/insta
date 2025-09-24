import { http } from 'configs/http';

export class CommentService {
  static async listPostComments(postId: string) {
    const result = await http.get(`/comments/post/${postId}`);
    if (result.status === 204) return [];
    if (result.status !== 200) throw new Error('Failed to fetch comments');
    return result.data.data as CommentDetails[];
  }

  static async createComment(postId: string, content: string) {
    const result = await http.post('/comments', { content, postId });
    if (result.status !== 201) throw new Error('Failed to create comment');
    return result.data.data;
  }

  static async deleteComment(commentId: string) {
    const result = await http.delete(`/comments/${commentId}`);
    if (result.status !== 200) throw new Error('Failed to delete comment');
  }
}
