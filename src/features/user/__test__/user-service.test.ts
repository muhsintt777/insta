import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { http } from 'configs/http';
import { UserService } from '../user-service';

vi.mock('configs/http', () => ({
  http: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCurrentUser', () => {
    it('returns user when successful', async () => {
      const mockUser = {
        id: 'user-1',
        fullName: 'John Doe',
        email: 'john@example.com',
      };
      (http.get as Mock).mockResolvedValue({
        status: 200,
        data: { data: mockUser },
      });

      const result = await UserService.fetchCurrentUser();

      expect(http.get).toHaveBeenCalledWith('/users/currentuser');
      expect(result).toEqual(mockUser);
    });

    it('throws error when fetch fails', async () => {
      (http.get as Mock).mockResolvedValue({ status: 500 });

      await expect(UserService.fetchCurrentUser()).rejects.toThrow(
        'Failed to fetch user details',
      );
    });

    it('throws error when unauthorized', async () => {
      (http.get as Mock).mockResolvedValue({ status: 401 });

      await expect(UserService.fetchCurrentUser()).rejects.toThrow(
        'Failed to fetch user details',
      );
    });
  });

  describe('editUserProfile', () => {
    it('updates user profile successfully with fullName', async () => {
      (http.put as Mock).mockResolvedValue({ status: 200 });

      await expect(
        UserService.editUserProfile({ fullName: 'Jane Doe' }),
      ).resolves.toBeUndefined();

      expect(http.put).toHaveBeenCalledWith('users/currentuser', {
        fullName: 'Jane Doe',
      });
    });

    it('updates user profile successfully with bio', async () => {
      (http.put as Mock).mockResolvedValue({ status: 200 });

      await expect(
        UserService.editUserProfile({ bio: 'New bio' }),
      ).resolves.toBeUndefined();

      expect(http.put).toHaveBeenCalledWith('users/currentuser', {
        bio: 'New bio',
      });
    });

    it('updates user profile successfully with both fullName and bio', async () => {
      (http.put as Mock).mockResolvedValue({ status: 200 });

      await expect(
        UserService.editUserProfile({ fullName: 'Jane Doe', bio: 'New bio' }),
      ).resolves.toBeUndefined();

      expect(http.put).toHaveBeenCalledWith('users/currentuser', {
        fullName: 'Jane Doe',
        bio: 'New bio',
      });
    });

    it('throws error when update fails', async () => {
      (http.put as Mock).mockResolvedValue({ status: 500 });

      await expect(
        UserService.editUserProfile({ fullName: 'Jane Doe' }),
      ).rejects.toThrow('Failed to update user profile');
    });
  });
});
