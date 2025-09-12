import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { APP_SCREEN, UnAuthenticationPramsList } from './ScreenTypes';
import { DrawerNavigator } from './Drawer';
import { CustomerHomeScreen } from '@src/screens';

const AuthStackNavigation = createStackNavigator<UnAuthenticationPramsList>();

export const AuthStack = () => {
  const defaultScreenOptions: StackNavigationOptions = {
    animationTypeForReplace: 'pop',
    gestureEnabled: false,
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  };

  const screens: {
    name: keyof UnAuthenticationPramsList;
    component: React.ComponentType<Element>;
  }[] = [
    {
      name: APP_SCREEN.ONBOARDING,
      component: CustomerHomeScreen,
    },
  ];

  return (
    <AuthStackNavigation.Navigator>
      {screens.map(screen => (
        <AuthStackNavigation.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={defaultScreenOptions}
        />
      ))}
    </AuthStackNavigation.Navigator>
  );
};

export const AppStack = () => {
  return <DrawerNavigator />;
};
