import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';

import { APP_SCREEN } from './ScreenTypes';
import { HomeScreen, ScheduleScreen } from '@src/screens';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{}}>
      <Tab.Screen
        name={APP_SCREEN.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.SCHEDULE}
        component={ScheduleScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export { MainTab };
