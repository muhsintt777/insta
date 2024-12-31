export interface User {
  _id: string;
  email: string;
  username: string;
  fullName: string;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  bio: string | null;
  gender: string | null;
  __v: number;
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
