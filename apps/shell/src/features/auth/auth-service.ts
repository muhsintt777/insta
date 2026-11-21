import { CustomError, ERROR_TYPE, http, HTTP_STATUS_CODES } from '@insta/http';

export class AuthService {
  static async signout() {
    const res = await http.post('auth/logout');
    if (res.status !== HTTP_STATUS_CODES.OK) {
      throw new CustomError(ERROR_TYPE.UNKNOWN_API_ERROR, 'Failed to logout');
    }
  }

  static async refreshAuth() {
    const result = (await http.post('auth/refresh')).data;
    if (result.errorType) {
      throw new Error('Failed to refresh auth');
    }
  }
}
