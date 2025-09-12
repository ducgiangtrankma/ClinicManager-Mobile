export enum APP_SCREEN {
  AUTHENTICATION = 'AUTHENTICATION',
  MAIN_APP = 'MAIN_APP',
  DRAWER = 'DRAWER',
  HOME_STACK = 'HOME_STACK',
  AUTH_STACK = 'AUTH_STACK',
  //Screen
  ONBOARDING = 'ONBOARDING',

  HOME = 'HOME',
  SCHEDULE = 'SCHEDULE',
}
export type UnAuthenticationPramsList = {
  [APP_SCREEN.ONBOARDING]: undefined;
};

export type AuthenticationPramsList = {
  [APP_SCREEN.DRAWER]: undefined;
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.SCHEDULE]: undefined;
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: undefined;
  [APP_SCREEN.DRAWER]: undefined;
  [APP_SCREEN.MAIN_APP]: undefined;
} & Partial<UnAuthenticationPramsList> &
  Partial<AuthenticationPramsList>;
