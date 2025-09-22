interface CommentDetails {
  id: string;
  content: string;
  creator: {
    id: string;
    username: string;
    profileImage: string | null;
  };
  postId: string;
  createdAt: string;
  updatedAt: string;
}
