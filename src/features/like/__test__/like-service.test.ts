import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { http } from 'configs/http';
import { COMMON_ERROR_MESSAGE } from 'configs/constants';
import { LikeService } from '../like-service';

vi.mock('configs/http', () => ({
  http: {
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('LikeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createLike', () => {
    const mockPostId = 'post-123';

    it('creates like successfully', async () => {
      (http.post as Mock).mockResolvedValue({
        status: 201,
      });

      await expect(LikeService.createLike(mockPostId)).resolves.toBeUndefined();

      expect(http.post).toHaveBeenCalledWith('likes', { postId: mockPostId });
    });

    it('throws error when create like fails', async () => {
      (http.post as Mock).mockResolvedValue({
        status: 400,
      });

      await expect(LikeService.createLike(mockPostId)).rejects.toThrow(
        COMMON_ERROR_MESSAGE,
      );
    });
  });

  describe('deleteLike', () => {
    const mockPostId = 'post-123';

    it('deletes like successfully', async () => {
      (http.delete as Mock).mockResolvedValue({
        status: 200,
      });

      await expect(LikeService.deleteLike(mockPostId)).resolves.toBeUndefined();

      expect(http.delete).toHaveBeenCalledWith(`likes/${mockPostId}`);
    });

    it('throws error when delete like fails', async () => {
      (http.delete as Mock).mockResolvedValue({
        status: 500,
      });

      await expect(LikeService.deleteLike(mockPostId)).rejects.toThrow(
        COMMON_ERROR_MESSAGE,
      );
    });
  });
});
