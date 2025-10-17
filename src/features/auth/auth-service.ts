import { ERROR_TYPE, HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';
import { store } from 'configs/store';
import { CustomError } from 'utils/custom-error';
import { authActions } from './auth-slice';

interface CreateUserParams {
  email: string;
  password: string;
  fullName: string;
  username: string;
  profileImage?: File;
}

type LoginParams =
  | { email: string; password: string }
  | { username: string; password: string };

export class AuthService {
  static async createUser(params: CreateUserParams) {
    const formData = new FormData();
    formData.append('email', params.email);
    formData.append('password', params.password);
    formData.append('fullName', params.fullName);
    formData.append('username', params.username);
    if (params.profileImage) {
      formData.append(
        'profileImage',
        params.profileImage,
        params.profileImage.name,
      );
    }

    const { status } = await http.post('users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (status !== HTTP_STATUS_CODES.CREATED) {
      throw new CustomError(
        ERROR_TYPE.UNKNOWN_API_ERROR,
        'Failed to create user',
      );
    }
  }

  static async login(params: LoginParams) {
    const response = await http.post('auth/login', params);
    if (response.status !== HTTP_STATUS_CODES.OK) {
      throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to login');
    }
    store.dispatch(authActions.setToken(response.data.data?.accessToken));
  }

  static async signout() {
    const res = await http.post('auth/logout');
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to logout');
    }
    store.dispatch(authActions.clearToken());
  }

  static async refreshAuth() {
    await http.post('auth/refresh');
  }
}
