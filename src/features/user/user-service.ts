import { http } from 'configs/http';
import { ERROR_TYPE, HTTP_STATUS_CODES } from 'configs/constants';
import { CustomError } from 'utils/custom-error';
import { asyncHandler } from 'utils/common';
import { User } from './user-types';

export const userService = {
  fetchCurrentUser: async () =>
    asyncHandler(async () => {
      const result = await http.get('users/currentuser');
      if (result.status !== HTTP_STATUS_CODES.OK) {
        throw new CustomError(
          ERROR_TYPE.UNKNOWN_API_ERROR,
          'Fetch user failed',
        );
      }
      return result.data?.data as User;
    }),
};
