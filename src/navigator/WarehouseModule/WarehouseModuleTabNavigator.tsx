import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAppTheme } from '@src/common';
import { TabbarPlusButton } from '@src/components';
import { CategoryScreen, ProductScreen } from '@src/screens';
import { APP_FONTS } from '@src/themes';
import { sizes } from '@src/utils';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyComponent } from '../EmptyComponent';
import { APP_SCREEN } from '../ScreenTypes';
import { CategoryTabIcon, ProductTabIcon } from '@src/assets';

const Tab = createBottomTabNavigator();
const renderProductIcon = (focused: boolean, color: string) => {
  return focused ? <ProductTabIcon color={color} /> : <ProductTabIcon />;
};

const renderCategoryIcon = (focused: boolean, color: string) => {
  return focused ? <CategoryTabIcon color={color} /> : <CategoryTabIcon />;
};
const WarehouseMainTab = () => {
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
          backgroundColor: Colors.white,
        },
        tabBarLabelStyle: {
          fontFamily: APP_FONTS.content_semibold,
          fontSize: sizes._13sdp,
        },
      }}
    >
      <Tab.Screen
        name={APP_SCREEN.PRODUCT_SCREEN}
        component={ProductScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('warehouse.homeTab.name'),
          tabBarIcon: ({ focused }) => renderProductIcon(focused, Colors.green),
        }}
        listeners={{
          focus: () => setCurrentFocusedTab(APP_SCREEN.PRODUCT_SCREEN),
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
        name="WarehouseInventory"
        component={CategoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('warehouse.inventoryTab.name'),
          tabBarIcon: ({ focused }) =>
            renderCategoryIcon(focused, Colors.green),
        }}
        listeners={{
          focus: () => setCurrentFocusedTab(APP_SCREEN.CATEGORY_SCREEN),
        }}
      />
    </Tab.Navigator>
  );
};

export { WarehouseMainTab };
