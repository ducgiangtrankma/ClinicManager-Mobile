import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';

import { BillExportListScreen } from '@src/screens';
import { Platform } from 'react-native';

const PaymentModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const PaymentModuleStack = () => {
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
      name: APP_SCREEN.PAYMENT_EXPORT,
      component: BillExportListScreen,
    },
  ];
  return (
    <PaymentModuleStackNavigation.Navigator
      initialRouteName={APP_SCREEN.PAYMENT_EXPORT}
    >
      {screens.map(screen => (
        <PaymentModuleStackNavigation.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={defaultScreenOptions}
        />
      ))}
    </PaymentModuleStackNavigation.Navigator>
  );
};
