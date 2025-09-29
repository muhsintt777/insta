interface User {
  bio: string | null;
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

interface UserSuccessSlice {
  status: 'SUCCESS';
  details: User;
}

interface UserFailedSlice {
  status: 'FAILED';
  details: null;
  error: string;
}

interface UserLoadingSlice {
  status: 'LOADING';
  details: null;
}

interface UserLoggedOutSlice {
  status: 'LOGGED_OUT';
  details: null;
}

export type UserSlice =
  | UserSuccessSlice
  | UserFailedSlice
  | UserLoadingSlice
  | UserLoggedOutSlice;
