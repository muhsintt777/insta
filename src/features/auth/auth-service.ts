import { ERROR_TYPE, HTTP_STATUS_CODES } from 'configs/constants';
import { http } from 'configs/http';
import { CustomError } from 'utils/custom-error';
import { apiErrorHandler } from 'utils/error-handlers';

interface CreateUserParams {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

type LoginParams =
  | { email: string; password: string }
  | { username: string; password: string };

export const authService = {
  createUser: async (params: CreateUserParams) => {
    try {
      const { status } = await http.post('api/users', params);
      if (status !== HTTP_STATUS_CODES.CREATED) {
        throw new CustomError(
          ERROR_TYPE.UNKNOWN_API_ERROR,
          'Failed to create user',
        );
      }
    } catch (error) {
      apiErrorHandler(error);
    }
  },

  login: async (params: LoginParams) => {
    try {
      const response = await http.post('api/auth/login', params);
      if (response.status !== HTTP_STATUS_CODES.OK) {
        throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to login');
      }
    } catch (error) {
      apiErrorHandler(error);
    }
  },
};
