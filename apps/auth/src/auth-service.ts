import type { AuthLoginParams, AuthSignupParams } from '@insta/contracts';
import { CustomError, ERROR_TYPE, http, HTTP_STATUS_CODES } from '@insta/http';

export class AuthService {
  static async createUser(params: AuthSignupParams) {
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

  static async login(params: AuthLoginParams) {
    const response = await http.post('auth/login', params);
    if (response.status !== HTTP_STATUS_CODES.OK) {
      throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to login');
    }
  }
}
