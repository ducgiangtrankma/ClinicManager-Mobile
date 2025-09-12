import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, { useState } from 'react';

import { APP_SCREEN } from '../ScreenTypes';
import { CustomerHomeScreen, CustomerScheduleScreen } from '@src/screens';
import { EmptyComponent } from '../EmptyComponent';
import { TabbarPlusButton } from '@src/components';
import { CustomerTabIcon, ScheduleTabIcon } from '@src/assets';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@src/common';
import { APP_FONTS } from '@src/themes';
import { sizes } from '@src/utils';

const Tab = createBottomTabNavigator();
const renderCustomerIcon = (focused: boolean, color: string) => {
  return focused ? <CustomerTabIcon color={color} /> : <CustomerTabIcon />;
};

const renderScheduleIcon = (focused: boolean, color: string) => {
  return focused ? <ScheduleTabIcon color={color} /> : <ScheduleTabIcon />;
};
const CustomerMainTab = () => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

  const [currentFocusedTab, setCurrentFocusedTab] = useState<string>(
    APP_SCREEN.CUSTOMER_LIST,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.blackGray,
        tabBarStyle: {
          backgroundColor: Colors.while,
        },
        tabBarLabelStyle: {
          fontFamily: APP_FONTS.content_semibold,
          fontSize: sizes._13sdp,
        },
      }}
      screenListeners={{
        tabPress: e => {
          // Lấy tên tab từ event
          const tabName = e.target?.split('-')[0];
          if (tabName && tabName !== 'Plus Button') {
            setCurrentFocusedTab(tabName);
          }
        },
      }}
    >
      <Tab.Screen
        name={APP_SCREEN.CUSTOMER_LIST}
        component={CustomerHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('customer.customerTab.name'),
          tabBarIcon: ({ focused }) =>
            renderCustomerIcon(focused, Colors.green),
        }}
        listeners={{
          focus: () => setCurrentFocusedTab(APP_SCREEN.CUSTOMER_LIST),
        }}
      />
      <Tab.Screen
        name={'Plus Button'}
        component={EmptyComponent}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <TabbarPlusButton currentTab={currentFocusedTab} />,
        }}
      />
      <Tab.Screen
        name={APP_SCREEN.SCHEDULE}
        component={CustomerScheduleScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('customer.scheduleTab.name'),
          tabBarIcon: ({ focused }) =>
            renderScheduleIcon(focused, Colors.green),
        }}
        listeners={{
          focus: () => setCurrentFocusedTab(APP_SCREEN.SCHEDULE),
        }}
      />
    </Tab.Navigator>
  );
};

export { CustomerMainTab };
