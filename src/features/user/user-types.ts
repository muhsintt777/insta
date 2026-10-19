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

export interface UserSuccessState {
  status: 'SUCCESS';
  details: User;
}

export interface UserFailedState {
  status: 'FAILED';
  details: null;
  error: string;
}

export interface UserLoadingState {
  status: 'LOADING';
  details: null;
}

export interface UserLoggedOutState {
  status: 'LOGGED_OUT';
  details: null;
}

export type UserState =
  | UserSuccessState
  | UserFailedState
  | UserLoadingState
  | UserLoggedOutState;
