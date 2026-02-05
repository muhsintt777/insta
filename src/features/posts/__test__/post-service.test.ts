import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { http } from 'configs/http';
import { PostService } from '../post-service';

vi.mock('configs/http', () => ({
  http: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
    put: vi.fn(),
  },
}));

describe('PostService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchUserPosts', () => {
    it('returns posts when successful', async () => {
      const mockPosts = [{ id: '1', caption: 'Test post' }];
      (http.get as Mock).mockResolvedValue({
        status: 200,
        data: { data: mockPosts },
      });

      const result = await PostService.fetchUserPosts();

      expect(http.get).toHaveBeenCalledWith('posts/currentuser');
      expect(result).toEqual(mockPosts);
    });

    it('returns empty array when no content', async () => {
      (http.get as Mock).mockResolvedValue({ status: 204 });

      const result = await PostService.fetchUserPosts();

      expect(result).toEqual([]);
    });

    it('throws error when fetch fails', async () => {
      (http.get as Mock).mockResolvedValue({ status: 500, data: null });

      await expect(PostService.fetchUserPosts()).rejects.toThrow(
        'Failed to fetch user posts. Please try again later.',
      );
    });
  });

  describe('fetchPosts', () => {
    it('returns posts when successful', async () => {
      const mockPosts = [{ id: '1', caption: 'Test post' }];
      (http.get as Mock).mockResolvedValue({
        status: 200,
        data: { data: mockPosts },
      });

      const result = await PostService.fetchPosts();

      expect(http.get).toHaveBeenCalledWith('posts');
      expect(result).toEqual(mockPosts);
    });

    it('returns empty array when no content', async () => {
      (http.get as Mock).mockResolvedValue({ status: 204 });

      const result = await PostService.fetchPosts();

      expect(result).toEqual([]);
    });

    it('throws error when fetch fails', async () => {
      (http.get as Mock).mockResolvedValue({ status: 500, data: null });

      await expect(PostService.fetchPosts()).rejects.toThrow(
        'Failed to fetch posts. Please try again later.',
      );
    });
  });

  describe('createPost', () => {
    it('creates post successfully', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const params = { image: mockFile, caption: 'Test caption' };

      (http.post as Mock).mockResolvedValue({ status: 201 });

      await expect(PostService.createPost(params)).resolves.toBeUndefined();

      expect(http.post).toHaveBeenCalledWith('posts', expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });

    it('throws error when create fails', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const params = { image: mockFile, caption: 'Test caption' };

      (http.post as Mock).mockResolvedValue({ status: 400 });

      await expect(PostService.createPost(params)).rejects.toThrow(
        'Failed to create post. Please try again later.',
      );
    });
  });

  describe('deletePost', () => {
    it('deletes post successfully', async () => {
      (http.delete as Mock).mockResolvedValue({ status: 200 });

      await expect(PostService.deletePost('post-123')).resolves.toBeUndefined();

      expect(http.delete).toHaveBeenCalledWith('posts/post-123');
    });

    it('throws error when delete fails', async () => {
      (http.delete as Mock).mockResolvedValue({ status: 500 });

      await expect(PostService.deletePost('post-123')).rejects.toThrow(
        'Failed to delete post. Please try again later.',
      );
    });
  });

  describe('editPost', () => {
    it('edits post successfully', async () => {
      (http.put as Mock).mockResolvedValue({ status: 200 });

      await expect(
        PostService.editPost('post-123', 'Updated caption'),
      ).resolves.toBeUndefined();

      expect(http.put).toHaveBeenCalledWith('posts/post-123', {
        caption: 'Updated caption',
      });
    });

    it('throws error when edit fails', async () => {
      (http.put as Mock).mockResolvedValue({ status: 500 });

      await expect(
        PostService.editPost('post-123', 'Updated caption'),
      ).rejects.toThrow('Failed to edit post. Please try again later.');
    });
  });
});
