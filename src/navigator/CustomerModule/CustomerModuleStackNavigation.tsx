import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';
import { CreateCustomerScreen } from '@src/screens';
import { CustomerMainTab } from './CustomerModuleTabNavigator';

const CustomerModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const CustomerModuleStack = () => {
  const defaultScreenOptions: StackNavigationOptions = {
    animationTypeForReplace: 'pop',
    gestureEnabled: false,
    headerShown: false,
    // cardStyleInterpolator: forZoom,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
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
