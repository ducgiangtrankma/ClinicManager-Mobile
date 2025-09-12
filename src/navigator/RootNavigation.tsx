import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { APP_SCREEN, RootStackParamList } from './ScreenTypes';
import { DrawerNavigator } from './Drawer';
const RootStack = createStackNavigator<RootStackParamList>();
export const RootNavigation = () => {
  return (
    <RootStack.Navigator>
      <>
        <RootStack.Screen
          name={APP_SCREEN.DRAWER}
          component={DrawerNavigator}
          options={{
            animationTypeForReplace: 'pop',
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </>
    </RootStack.Navigator>
  );
};
