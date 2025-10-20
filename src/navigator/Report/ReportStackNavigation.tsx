import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { Platform } from 'react-native';
import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';
import { ReportMainTab } from './ReportModuleTabNavigator';

const ReportModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const ReportModuleStack = () => {
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
      name: APP_SCREEN.REPORT_MODULE,
      component: ReportMainTab,
    },
  ];
  return (
    <ReportModuleStackNavigation.Navigator
      initialRouteName={APP_SCREEN.REPORT_MODULE}
    >
      {screens.map(screen => (
        <ReportModuleStackNavigation.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={defaultScreenOptions}
        />
      ))}
    </ReportModuleStackNavigation.Navigator>
  );
};
