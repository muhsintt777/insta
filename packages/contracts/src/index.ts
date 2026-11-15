export const MFE_EVENT_NAMES = {
  posts: {
    created: 'post:created',
    deleted: 'post:deleted',
  },
  user: {
    updated: 'user:updated',
  },
  navigation: {
    back: 'navigation:back',
  },
  toast: {
    success: 'toast:success',
    error: 'toast:error',
    info: 'toast:info',
    warning: 'toast:warning',
  },
} as const;

export interface UserProfile {
  bio: string;
  gender: string | null;
  mobileNo: string | null;
  email: string;
  username: string;
  fullName: string;
  profileImage: string | null;
  postCount: number;
  friendsCount: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ToastEventDetail {
  message: string;
}

export interface MfeEventContracts {
  [MFE_EVENT_NAMES.posts.created]: undefined;
  [MFE_EVENT_NAMES.posts.deleted]: undefined;
  [MFE_EVENT_NAMES.user.updated]: UserProfile;
  [MFE_EVENT_NAMES.navigation.back]: undefined;
  [MFE_EVENT_NAMES.toast.success]: ToastEventDetail;
  [MFE_EVENT_NAMES.toast.error]: ToastEventDetail;
  [MFE_EVENT_NAMES.toast.info]: ToastEventDetail;
  [MFE_EVENT_NAMES.toast.warning]: ToastEventDetail;
}

export type MfeEventName = keyof MfeEventContracts;

export interface Post {
  id: string;
  image: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  creator: {
    id: string;
    fullName: string;
    username: string;
    profileImage: string | null;
  };
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}
