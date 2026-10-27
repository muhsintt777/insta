export interface Post {
  id: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  creator: {
    id: string;
    fullName: string;
    username: string;
    profileImage: string | null;
  };
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditPostParams {
  postId: string;
  caption: string;
}

export interface CreatePostParams {
  image: File;
  caption: string;
}
