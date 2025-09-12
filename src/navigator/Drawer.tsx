/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';

import React from 'react';
import { MainTab } from './TabNavigator';

const Drawer = createDrawerNavigator();
export const DrawerNavigator: React.FunctionComponent = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: true }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name={'Trang chủ'}
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
