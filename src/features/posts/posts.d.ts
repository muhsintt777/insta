interface Post {
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
  createdAt: string;
  updatedAt: string;
}

interface EditPostParams {
  postId: string;
  caption: string;
}
