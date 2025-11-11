import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';

import { BillErrorTabIcon, BillExportTabIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { BillErrorListScreen, BillExportListScreen } from '@src/screens';
import { APP_FONTS } from '@src/themes';
import { sizes } from '@src/utils';
import { useTranslation } from 'react-i18next';
import { APP_SCREEN } from '../ScreenTypes';

const Tab = createBottomTabNavigator();
const renderBillExportIcon = (focused: boolean, color: string) => {
  return focused ? <BillExportTabIcon color={color} /> : <BillExportTabIcon />;
};

const renderBillErrorIcon = (focused: boolean, color: string) => {
  return focused ? <BillErrorTabIcon color={color} /> : <BillErrorTabIcon />;
};
const PaymentMainTab = () => {
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
        name={APP_SCREEN.PAYMENT_EXPORT}
        component={BillExportListScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('bill.billExportTab.name'),
          tabBarIcon: ({ focused }) =>
            renderBillExportIcon(focused, Colors.green),
        }}
      />

      <Tab.Screen
        name={APP_SCREEN.PAYMENT_ERROR}
        component={BillErrorListScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('bill.billErrorTab.name'),
          tabBarIcon: ({ focused }) =>
            renderBillErrorIcon(focused, Colors.green),
        }}
      />
    </Tab.Navigator>
  );
};

export { PaymentMainTab };
