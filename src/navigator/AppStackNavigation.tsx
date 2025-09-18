import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import {
  ForgotPasswordScreen,
  OnBoardingScreen,
  SignInScreen,
} from '@src/screens';
import { DrawerNavigator } from './Drawer';
import { APP_SCREEN, UnAuthenticationPramsList } from './ScreenTypes';

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
      component: OnBoardingScreen,
    },
    {
      name: APP_SCREEN.SIGNIN,
      component: SignInScreen,
    },
    {
      name: APP_SCREEN.FORGOT_PASSWORD,
      component: ForgotPasswordScreen,
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
