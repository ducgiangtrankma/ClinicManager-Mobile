/* eslint-disable react/no-unstable-nested-components */
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  subscribeTopic,
  useAppTheme,
  useBackgroundOpenedNotification,
  useInAppNotification,
  useKilledOpenedNotification,
} from '@src/common';
import { AppModuleListScreen, NotificationScreen } from '@src/screens';
import React, { useCallback, useEffect } from 'react';
import { CustomerModuleStack } from './CustomerModule/CustomerModuleStackNavigation';
import { APP_SCREEN } from './ScreenTypes';
import { WarehouseModuleStack } from './WarehouseModule/WarehoustModuleStackNavigation';
import { DrawerContent } from './DrawerContent';
import {
  DrawerBillIcon,
  FacilityIcon,
  GroupUserIcon,
  NotificationIcon,
  ReportModuleIcon,
  WarehouseIcon,
} from '@src/assets';
import { useTranslation } from 'react-i18next';
import { ReportModuleStack } from './Report/ReportStackNavigation';
import { getDeviceToken } from '@src/utils';
import { RemoteNotificationEntity } from '@src/models';
import { UserService } from '@src/services';
import { NotificationService } from '@src/services/notification-service';
import { showToast } from '@src/components';
import { PaymentModuleStack } from './PaymentModule/PaymentModuleStackNavigation';

const Drawer = createDrawerNavigator();
export const DrawerNavigator: React.FunctionComponent = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();

  //Xử lý event Notification - start
  useInAppNotification(mess => {
    console.log('mess', mess);
    const messageData = mess as RemoteNotificationEntity;
    // dispatch(onAddReadNotification(messageData?.data?.notificationId));
    showToast(
      'success',
      messageData.notification.title,
      messageData.notification.body,
      'none',
      1500,
    );
  });

  const handleOutsideNotification = useCallback(
    (messageData: RemoteNotificationEntity) => {
      const type = messageData?.data?.type;
      console.log('handleOutsideNotification - type', type);
    },
    [],
  );

  useBackgroundOpenedNotification(mess => {
    handleOutsideNotification(mess as RemoteNotificationEntity);
  });

  useKilledOpenedNotification(mess => {
    handleOutsideNotification(mess as RemoteNotificationEntity);
  });
  //Xử lý event Notification - end

  const registerDevice = useCallback(async () => {
    try {
      const deviceToken = await getDeviceToken();
      if (deviceToken) {
        await UserService.registerDeviceInfo(deviceToken);
      }
      await subscribeTopic('all');
      await NotificationService.registerTopic('all');
    } catch (error) {
      console.log('registerDevice -error', error);
    }
  }, []);

  useEffect(() => {
    registerDevice();
  }, [registerDevice]);
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
      <Drawer.Screen
        name={APP_SCREEN.PAYMENT_MODULE}
        component={PaymentModuleStack}
        options={{
          drawerIcon: ({ color }) => <DrawerBillIcon color={color} />,
          headerShown: false,
          title: t('drawer_payment'),
        }}
      />
      <Drawer.Screen
        name={APP_SCREEN.NOTIFICATION}
        component={NotificationScreen}
        options={{
          drawerIcon: ({ color }) => <NotificationIcon color={color} />,
          headerShown: false,
          title: t('drawer_noti'),
        }}
      />
    </Drawer.Navigator>
  );
};
