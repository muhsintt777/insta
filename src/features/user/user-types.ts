export interface User {
  bio: string;
  gender: string | null;
  mobileNo: string | null;
  email: string;
  username: string;
  fullName: string;
  profileImage: string | null;
  postCount: number;
  friendsCount: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type EditUserProfileParams = Partial<Pick<User, 'fullName' | 'bio'>>;

export interface UserState {
  details: User | null;
}
