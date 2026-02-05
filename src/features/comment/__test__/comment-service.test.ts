import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { http } from 'configs/http';
import { CommentService } from '../comment-service';

vi.mock('configs/http', () => ({
  http: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('CommentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listPostComments', () => {
    const mockPostId = 'post-123';
    const mockComments: CommentDetails[] = [
      {
        id: 'comment-1',
        content: 'Test comment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        postId: mockPostId,
        creator: {
          id: 'user-1',
          username: 'testuser',
          profileImage: 'https://example.com/image.jpg',
        },
      },
    ];

    it('returns comments on success', async () => {
      (http.get as Mock).mockResolvedValue({
        status: 200,
        data: { data: mockComments },
      });

      const result = await CommentService.listPostComments(mockPostId);

      expect(http.get).toHaveBeenCalledWith(`/comments/post/${mockPostId}`);
      expect(result).toEqual(mockComments);
    });

    it('returns empty array on 204 status', async () => {
      (http.get as Mock).mockResolvedValue({
        status: 204,
      });

      const result = await CommentService.listPostComments(mockPostId);

      expect(result).toEqual([]);
    });

    it('throws error on failure', async () => {
      (http.get as Mock).mockResolvedValue({
        status: 500,
      });

      await expect(CommentService.listPostComments(mockPostId)).rejects.toThrow(
        'Failed to fetch comments',
      );
    });
  });

  describe('createComment', () => {
    const mockPostId = 'post-123';
    const mockContent = 'This is a new comment';
    const mockCreatedComment = {
      id: 'comment-new',
      content: mockContent,
      createdAt: new Date().toISOString(),
    };

    it('creates comment successfully', async () => {
      (http.post as Mock).mockResolvedValue({
        status: 201,
        data: { data: mockCreatedComment },
      });

      const result = await CommentService.createComment(
        mockPostId,
        mockContent,
      );

      expect(http.post).toHaveBeenCalledWith('/comments', {
        content: mockContent,
        postId: mockPostId,
      });
      expect(result).toEqual(mockCreatedComment);
    });

    it('throws error on failure', async () => {
      (http.post as Mock).mockResolvedValue({
        status: 400,
      });

      await expect(
        CommentService.createComment(mockPostId, mockContent),
      ).rejects.toThrow('Failed to create comment');
    });
  });

  describe('deleteComment', () => {
    const mockCommentId = 'comment-123';

    it('deletes comment successfully', async () => {
      (http.delete as Mock).mockResolvedValue({
        status: 200,
      });

      await expect(
        CommentService.deleteComment(mockCommentId),
      ).resolves.toBeUndefined();

      expect(http.delete).toHaveBeenCalledWith(`/comments/${mockCommentId}`);
    });

    it('throws error on failure', async () => {
      (http.delete as Mock).mockResolvedValue({
        status: 500,
      });

      await expect(CommentService.deleteComment(mockCommentId)).rejects.toThrow(
        'Failed to delete comment',
      );
    });
  });
});
