import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { Platform } from 'react-native';
import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';
import { NotificationScreen } from '@src/screens';

const NotificationModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const NotificationModuleStack = () => {
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
      name: APP_SCREEN.NOTIFICATION,
      component: NotificationScreen,
    },
  ];
  return (
    <NotificationModuleStackNavigation.Navigator
      initialRouteName={APP_SCREEN.REPORT_MODULE}
    >
      {screens.map(screen => (
        <NotificationModuleStackNavigation.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={defaultScreenOptions}
        />
      ))}
    </NotificationModuleStackNavigation.Navigator>
  );
};
