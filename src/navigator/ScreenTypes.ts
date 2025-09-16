export enum APP_SCREEN {
  AUTHENTICATION = 'AUTHENTICATION',
  AUTH_STACK = 'AUTH_STACK',
  APP_STACK = 'APP_STACK',
  MODULE_MENU = 'MODULE_MENU',
  CUSTOMER_MODULE = 'CUSTOMER_MODULE',
  WAREHOUSE_MODULE = 'WAREHOUSE_MODULE',
  CREATE_FACILITY = 'CREATE_FACILITY',
  DRAWER = 'DRAWER',
  //Screen
  ONBOARDING = 'ONBOARDING',
  CUSTOMER_TAB = 'CUSTOMER_TAB',
  CUSTOMER_LIST = 'CUSTOMER_LIST',
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  SCHEDULE = 'SCHEDULE',

  WAREHOUSE_TAB = 'WAREHOUSE_TAB',
}
export type UnAuthenticationPramsList = {
  [APP_SCREEN.ONBOARDING]: undefined;
  [APP_SCREEN.AUTH_STACK]: undefined;
};

export type AuthenticationPramsList = {
  [APP_SCREEN.DRAWER]: undefined;
  [APP_SCREEN.MODULE_MENU]: undefined;
  [APP_SCREEN.CUSTOMER_MODULE]: undefined;
  [APP_SCREEN.WAREHOUSE_MODULE]: undefined;
  [APP_SCREEN.CREATE_FACILITY]: undefined;
  [APP_SCREEN.CUSTOMER_TAB]: undefined;
  [APP_SCREEN.WAREHOUSE_TAB]: undefined;
  [APP_SCREEN.CUSTOMER_LIST]: undefined;
  [APP_SCREEN.CREATE_CUSTOMER]: undefined;
  [APP_SCREEN.SCHEDULE]: undefined;
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: undefined;
  [APP_SCREEN.AUTH_STACK]: undefined;
  [APP_SCREEN.APP_STACK]: undefined;
  [APP_SCREEN.DRAWER]: undefined;
} & Partial<UnAuthenticationPramsList> &
  Partial<AuthenticationPramsList>;
