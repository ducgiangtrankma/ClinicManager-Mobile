import { ScheduleType } from '../ScheduleEntity';
import { UserEntity } from '../UserEntity';

export interface AppStateEntity {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: UserEntity | undefined;
  showOnboarding: boolean;
  scheduleType: ScheduleType;
  shouldRefreshHome: boolean;
}
