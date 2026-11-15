export type { Post } from '@insta/contracts';

export interface EditPostParams {
  postId: string;
  caption: string;
}

export interface CreatePostParams {
  image: File;
  caption: string;
}
