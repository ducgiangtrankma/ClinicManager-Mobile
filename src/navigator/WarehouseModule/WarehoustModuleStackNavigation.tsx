import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';
import { WarehouseMainTab } from './WarehouseModuleTabNavigator';

const WarehouseModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const WarehouseModuleStack = () => {
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
      name: APP_SCREEN.WAREHOUSE_TAB,
      component: WarehouseMainTab,
    },
  ];
  return (
    <WarehouseModuleStackNavigation.Navigator
      initialRouteName={APP_SCREEN.WAREHOUSE_TAB}
    >
      {screens.map(screen => (
        <WarehouseModuleStackNavigation.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={defaultScreenOptions}
        />
      ))}
    </WarehouseModuleStackNavigation.Navigator>
  );
};
