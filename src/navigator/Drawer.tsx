/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator } from '@react-navigation/drawer';

import { useAppTheme } from '@src/common';
import { AppModuleListScreen } from '@src/screens';
import React from 'react';
import { CustomerModuleStack } from './CustomerModule/CustomerModuleStackNavigation';
import { APP_SCREEN } from './ScreenTypes';
import { WarehouseModuleStack } from './WarehouseModule/WarehoustModuleStackNavigation';
import { DrawerContent } from './DrawerContent';
import {
  FacilityIcon,
  GroupUserIcon,
  ReportModuleIcon,
  WarehouseIcon,
} from '@src/assets';
import { useTranslation } from 'react-i18next';
import { ReportModuleStack } from './Report/ReportStackNavigation';

const Drawer = createDrawerNavigator();
export const DrawerNavigator: React.FunctionComponent = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
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
          drawerIcon: ({ color }) => <FacilityIcon color={color} />,
          headerShown: false,
          title: t('drawer_facility'),
        }}
      />
      <Drawer.Screen
        name={APP_SCREEN.CUSTOMER_MODULE}
        component={CustomerModuleStack}
        options={{
          drawerIcon: ({ color }) => <GroupUserIcon color={color} />,
          headerShown: false,
          title: t('drawer_customer'),
        }}
      />
      <Drawer.Screen
        name={APP_SCREEN.WAREHOUSE_MODULE}
        component={WarehouseModuleStack}
        options={{
          drawerIcon: ({ color }) => <WarehouseIcon color={color} />,
          headerShown: false,
          title: t('drawer_warehouse'),
        }}
      />
      <Drawer.Screen
        name={APP_SCREEN.REPORT_MODULE}
        component={ReportModuleStack}
        options={{
          drawerIcon: ({ color }) => <ReportModuleIcon color={color} />,
          headerShown: false,
          title: t('drawer_report'),
        }}
      />
    </Drawer.Navigator>
  );
};
