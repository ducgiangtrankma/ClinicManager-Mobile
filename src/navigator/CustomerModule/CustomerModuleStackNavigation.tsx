import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';
import {
  CreateBillScreen,
  CreateCustomerScreen,
  CreateScheduleScreen,
  CreateTreatmentScreen,
  CustomerCostScreen,
  CustomerDetailScreen,
  TreatmentDetailScreen,
} from '@src/screens';
import { CustomerMainTab } from './CustomerModuleTabNavigator';
import { Platform } from 'react-native';

const CustomerModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const CustomerModuleStack = () => {
  const defaultScreenOptions: StackNavigationOptions = {
    animationTypeForReplace: 'push',
    gestureEnabled: false,
    headerShown: false,
    cardStyleInterpolator:
      Platform.OS === 'ios'
        ? CardStyleInterpolators.forFadeFromBottomAndroid
        : CardStyleInterpolators.forNoAnimation, // Nguyên nhân gây flick UI khi chuyển màn trên android
  };
  const screens: {
    name: keyof AuthenticationPramsList;
    component: React.ComponentType<Element>;
  }[] = [
    {
      name: APP_SCREEN.CUSTOMER_TAB,
      component: CustomerMainTab,
    },
    {
      name: APP_SCREEN.CREATE_CUSTOMER,
      component: CreateCustomerScreen,
    },
    {
      name: APP_SCREEN.CUSTOMER_DETAIL,
      component: CustomerDetailScreen,
    },
    {
      name: APP_SCREEN.CREATE_TREATMENT,
      component: CreateTreatmentScreen,
    },
    {
      name: APP_SCREEN.TREATMENT_DETAIL,
      component: TreatmentDetailScreen,
    },
    {
      name: APP_SCREEN.CREATE_BILL,
      component: CreateBillScreen,
    },
    {
      name: APP_SCREEN.CUSTOMER_COST,
      component: CustomerCostScreen,
    },
    {
      name: APP_SCREEN.CREATE_SCHEDULE,
      component: CreateScheduleScreen,
    },
  ];
  return (
    <CustomerModuleStackNavigation.Navigator
      initialRouteName={APP_SCREEN.CUSTOMER_TAB}
    >
      {screens.map(screen => (
        <CustomerModuleStackNavigation.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={defaultScreenOptions}
        />
      ))}
    </CustomerModuleStackNavigation.Navigator>
  );
};
