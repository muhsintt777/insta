import { HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';

interface CreatePostParams {
  image: File;
  caption: string;
}

export class PostService {
  static async fetchUserPosts() {
    const res = await http.get('posts/currentuser');
    if (res.status === HTTP_STATUS_CODES.NO_CONTENT) return [];
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data?.data) {
      throw new Error('Failed to fetch user posts. Please try again later.');
    }
    return res.data?.data as Post[];
  }

  static async fetchPosts() {
    const res = await http.get('posts');
    if (res.status === HTTP_STATUS_CODES.NO_CONTENT) return [];
    if (res.status !== HTTP_STATUS_CODES.OK || !res.data.data) {
      throw new Error('Failed to fetch posts. Please try again later.');
    }
    return res.data.data as Post[];
  }

  static async createPost(params: CreatePostParams) {
    const formData = new FormData();
    formData.append('image', params.image, params.image.name);
    formData.append('caption', params.caption);
    const res = await http.post('posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.status !== HTTP_STATUS_CODES.CREATED) {
      throw new Error('Failed to create post. Please try again later.');
    }
  }

  static async deletePost(postId: string) {
    const res = await http.delete(`posts/${postId}`);
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new Error('Failed to delete post. Please try again later.');
    }
  }
}
