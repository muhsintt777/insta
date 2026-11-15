import type { UserProfile } from '@insta/events';

export type User = UserProfile;

export type EditUserProfileParams = Partial<Pick<User, 'fullName' | 'bio'>>;
