import { useCallback, useEffect, useState } from 'react';
import { EventBus, MFE_EVENT_NAMES } from '@insta/events';
import type { Post } from '@insta/contracts';
import { DateUtils } from '@insta/utils/date-utils';
import { PostCard, PostCardSkeleton } from '@insta/ui/posts';
import { emitErrorToast } from './emit-error-toast';
import { UserService } from './user-service';

type ProfilePostsStatus = 'LOADING' | 'SUCCESS' | 'FAILED';

interface ProfilePostsProps {
  onPostDeleted: () => void;
}

export const ProfilePosts = ({ onPostDeleted }: ProfilePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<ProfilePostsStatus>('LOADING');

  const fetchPosts = useCallback(async () => {
    setStatus('LOADING');
    try {
      const result = await UserService.fetchUserPosts();
      setPosts(result);
      setStatus('SUCCESS');
    } catch (error) {
      emitErrorToast(error);
      setStatus('FAILED');
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
    const unsubscribeCreated = EventBus.on(
      MFE_EVENT_NAMES.posts.created,
      () => {
        void fetchPosts();
      },
    );
    const unsubscribeDeleted = EventBus.on(
      MFE_EVENT_NAMES.posts.deleted,
      () => {
        onPostDeleted();
        void fetchPosts();
      },
    );

    return () => {
      unsubscribeCreated();
      unsubscribeDeleted();
    };
  }, [fetchPosts, onPostDeleted]);

  return (
    <div>
      {status === 'LOADING' ? (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      ) : status === 'FAILED' ? (
        <p role="alert">Could not load posts.</p>
      ) : posts.length === 0 ? (
        <p>No posts to display.</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            caption={post.caption}
            image={post.image}
            likeCount={post.likeCount}
            userProfileImage={post.creator.profileImage}
            commentCount={post.commentCount}
            dateLabel={DateUtils.formatRelative(
              DateUtils.dateFromIsoString(post.createdAt),
            )}
            fullname={post.creator.fullName}
            isLiked={post.isLiked}
            customStyles={{ marginBottom: '6px' }}
          />
        ))
      )}
    </div>
  );
};
