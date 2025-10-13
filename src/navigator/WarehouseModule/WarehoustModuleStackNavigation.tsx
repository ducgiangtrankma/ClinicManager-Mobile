import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import React from 'react';

import { APP_SCREEN, AuthenticationPramsList } from '../ScreenTypes';
import { WarehouseMainTab } from './WarehouseModuleTabNavigator';
import {
  CategoryDetailScreen,
  CreateCategoryScreen,
  CreateProductScreen,
  ProductDetailScreen,
} from '@src/screens';
import { Platform } from 'react-native';

const WarehouseModuleStackNavigation =
  createStackNavigator<AuthenticationPramsList>();

export const WarehouseModuleStack = () => {
  const defaultScreenOptions: StackNavigationOptions = {
    animationTypeForReplace: 'pop',
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
      name: APP_SCREEN.WAREHOUSE_TAB,
      component: WarehouseMainTab,
    },
    {
      name: APP_SCREEN.CREATE_CATEGORY,
      component: CreateCategoryScreen,
    },
    {
      name: APP_SCREEN.CREATE_PRODUCT,
      component: CreateProductScreen,
    },
    {
      name: APP_SCREEN.PRODUCT_DETAIL,
      component: ProductDetailScreen,
    },
    {
      name: APP_SCREEN.CATEGORY_DETAIL,
      component: CategoryDetailScreen,
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
