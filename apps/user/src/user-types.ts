import type { UserProfile } from '@insta/contracts';

export type User = UserProfile;

export type EditUserProfileParams = Partial<Pick<User, 'fullName' | 'bio'>>;
