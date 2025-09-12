import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '@src/common';
import { AppText, PageContainer } from '@src/components';
import { APP_FONTS } from '@src/themes';
import { sizes } from '@src/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

// Temporary screens for Warehouse Module
const WarehouseHomeScreen = () => (
  <PageContainer>
    <AppText fontSize="24" textAlign="center">
      Warehouse Home
    </AppText>
  </PageContainer>
);

const WarehouseInventoryScreen = () => (
  <PageContainer>
    <AppText fontSize="24" textAlign="center">
      Warehouse Inventory
    </AppText>
  </PageContainer>
);

const WarehouseMainTab = () => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

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
    >
      <Tab.Screen
        name="WarehouseHome"
        component={WarehouseHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('warehouse.homeTab.name'),
        }}
      />
      <Tab.Screen
        name="WarehouseInventory"
        component={WarehouseInventoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('warehouse.inventoryTab.name'),
        }}
      />
    </Tab.Navigator>
  );
};

export { WarehouseMainTab };
