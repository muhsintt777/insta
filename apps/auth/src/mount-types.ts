import type { AuthRoute, AuthSessionStatus } from '@insta/contracts';

export interface AuthMountOptions {
  initialPath: AuthRoute;
  initialSessionStatus: AuthSessionStatus;
}
