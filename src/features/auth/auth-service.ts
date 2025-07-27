import { ERROR_TYPE, HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';
import { asyncHandler } from 'utils/common';
import { CustomError } from 'utils/custom-error';

interface CreateUserParams {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

type LoginParams =
  | { email: string; password: string }
  | { username: string; password: string };

export class AuthService {
  static async createUser(params: CreateUserParams) {
    return asyncHandler(async () => {
      const { status } = await http.post('users', params);
      if (status !== HTTP_STATUS_CODES.CREATED) {
        throw new CustomError(
          ERROR_TYPE.UNKNOWN_API_ERROR,
          'Failed to create user',
        );
      }
    });
  }

  static async login(params: LoginParams) {
    return asyncHandler(async () => {
      const response = await http.post('auth/login', params);
      if (response.status !== HTTP_STATUS_CODES.OK) {
        throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to login');
      }
    });
  }

  static async signout() {
    return asyncHandler(async () => {
      const result = (await http.post('auth/logout')).data;
      if (result.statusCode !== HTTP_STATUS_CODES.OK) {
        throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to logout');
      }
    });
  }

  static async refreshAuth() {
    // Implement refresh logic if needed
  }
}
