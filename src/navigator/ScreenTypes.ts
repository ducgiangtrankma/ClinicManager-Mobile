import { CreateBillPayload } from '@src/models';

export enum APP_SCREEN {
  AUTHENTICATION = 'AUTHENTICATION',
  AUTH_STACK = 'AUTH_STACK',
  APP_STACK = 'APP_STACK',
  MODULE_MENU = 'MODULE_MENU',
  CUSTOMER_MODULE = 'CUSTOMER_MODULE',
  WAREHOUSE_MODULE = 'WAREHOUSE_MODULE',
  CREATE_FACILITY = 'CREATE_FACILITY',
  DRAWER = 'DRAWER',
  SIGNIN = 'SIGNIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  VERIFY_OTP = 'VERIFY_OTP',

  //Screen
  ONBOARDING = 'ONBOARDING',
  CUSTOMER_TAB = 'CUSTOMER_TAB',
  CUSTOMER_LIST = 'CUSTOMER_LIST',
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  CUSTOMER_DETAIL = 'CUSTOMER_DETAIL',
  CREATE_TREATMENT = 'CREATE_TREATMENT',
  TREATMENT_DETAIL = 'TREATMENT_DETAIL',
  CREATE_BILL = 'CREATE_BILL',
  SCHEDULE = 'SCHEDULE',
  CUSTOMER_COST = 'CUSTOMER_COST',
  CREATE_SCHEDULE = 'CREATE_SCHEDULE',

  WAREHOUSE_TAB = 'WAREHOUSE_TAB',
  PRODUCT_SCREEN = 'PRODUCT_SCREEN',
  CATEGORY_SCREEN = 'CATEGORY_SCREEN',
  CREATE_PRODUCT = 'CREATE_PRODUCT',
  CREATE_CATEGORY = 'CREATE_CATEGORY',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CATEGORY_DETAIL = 'CATEGORY_DETAIL',
}
export type UnAuthenticationPramsList = {
  [APP_SCREEN.ONBOARDING]: undefined;
  [APP_SCREEN.AUTH_STACK]: undefined;
  [APP_SCREEN.SIGNIN]: {
    email?: string;
    signInMode?: boolean;
  };
  [APP_SCREEN.FORGOT_PASSWORD]: undefined;
  [APP_SCREEN.VERIFY_OTP]: {
    email: string;
  };
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
  [APP_SCREEN.CREATE_SCHEDULE]: {
    date: string;
  };
  [APP_SCREEN.CUSTOMER_DETAIL]: {
    customerId: string;
  };
  [APP_SCREEN.CREATE_TREATMENT]: {
    customerId: string;
  };
  [APP_SCREEN.TREATMENT_DETAIL]: {
    treatmentId: string;
  };
  [APP_SCREEN.CREATE_BILL]: {
    bill: CreateBillPayload;
  };
  [APP_SCREEN.SCHEDULE]: undefined;
  [APP_SCREEN.CUSTOMER_COST]: {
    customerId: string;
  };

  [APP_SCREEN.WAREHOUSE_MODULE]: undefined;
  [APP_SCREEN.PRODUCT_SCREEN]: undefined;
  [APP_SCREEN.CATEGORY_SCREEN]: undefined;
  [APP_SCREEN.CREATE_PRODUCT]: undefined;
  [APP_SCREEN.CREATE_CATEGORY]: undefined;
  [APP_SCREEN.PRODUCT_DETAIL]: {
    productId: string;
  };
  [APP_SCREEN.CATEGORY_DETAIL]: {
    categoryId: string;
  };
};

export type RootStackParamList = {
  [APP_SCREEN.AUTHENTICATION]: undefined;
  [APP_SCREEN.AUTH_STACK]: undefined;
  [APP_SCREEN.APP_STACK]: undefined;
  [APP_SCREEN.DRAWER]: undefined;
} & Partial<UnAuthenticationPramsList> &
  Partial<AuthenticationPramsList>;
