import { lazy, Suspense } from 'react';

const FriendsRemote = lazy(() => import('friends/Friends'));

export const Friends = () => (
  <Suspense fallback={<div role="status">Loading friends...</div>}>
    <FriendsRemote />
  </Suspense>
);
