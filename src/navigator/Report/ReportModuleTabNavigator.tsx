import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GrowthTabIcon, RevenueTabIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { CustomerGrowthScreen, CustomerRevenueScreen } from '@src/screens';
import { APP_FONTS } from '@src/themes';
import { sizes } from '@src/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { APP_SCREEN } from '../ScreenTypes';

const Tab = createBottomTabNavigator();
const renderGrowthIcon = (focused: boolean, color: string) => {
  return focused ? <GrowthTabIcon color={color} /> : <GrowthTabIcon />;
};

const renderRevenueIcon = (focused: boolean, color: string) => {
  return focused ? <RevenueTabIcon color={color} /> : <RevenueTabIcon />;
};
const ReportMainTab = () => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.blackGray,
        tabBarStyle: {
          backgroundColor: Colors.white,
        },
        tabBarLabelStyle: {
          fontFamily: APP_FONTS.content_semibold,
          fontSize: sizes._13sdp,
        },
      }}
    >
      <Tab.Screen
        name={APP_SCREEN.CUSTOMER_GROWTH}
        component={CustomerGrowthScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('report.growth.name'),
          tabBarIcon: ({ focused }) => renderGrowthIcon(focused, Colors.green),
        }}
      />

      <Tab.Screen
        name="WarehouseInventory"
        component={CustomerRevenueScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('report.revenue.name'),
          tabBarIcon: ({ focused }) => renderRevenueIcon(focused, Colors.green),
        }}
      />
    </Tab.Navigator>
  );
};

export { ReportMainTab };
