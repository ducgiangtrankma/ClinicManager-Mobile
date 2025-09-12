/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';

import { useAppTheme } from '@src/common';
import { AppModuleListScreen } from '@src/screens';
import React from 'react';
import { CustomerModuleStack } from './CustomerModule/CustomerModuleStackNavigation';
import { APP_SCREEN } from './ScreenTypes';
import { WarehouseModuleStack } from './WarehouseModule/WarehoustModuleStackNavigation';

const Drawer = createDrawerNavigator();
export const DrawerNavigator: React.FunctionComponent = () => {
  const { Colors } = useAppTheme();

  return (
    <Drawer.Navigator
      initialRouteName={APP_SCREEN.MODULE_MENU}
      screenOptions={{
        swipeEnabled: true,
        drawerStyle: {
          backgroundColor: Colors.defaultPageBackground, // Đổi màu background của Drawer
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name={APP_SCREEN.MODULE_MENU}
        component={AppModuleListScreen}
        options={{
          headerShown: false,
          title: 'Module Menu',
        }}
      />
      <Drawer.Screen
        name={APP_SCREEN.CUSTOMER_MODULE}
        component={CustomerModuleStack}
        options={{
          headerShown: false,
          title: 'Customer Module',
        }}
      />
      <Drawer.Screen
        name={APP_SCREEN.WAREHOUSE_MODULE}
        component={WarehouseModuleStack}
        options={{
          headerShown: false,
          title: 'Warehouse Module',
        }}
      />
    </Drawer.Navigator>
  );
};
