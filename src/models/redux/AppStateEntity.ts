import { UserEntity } from '../UserEntity';

export interface AppStateEntity {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: UserEntity | undefined;
}
