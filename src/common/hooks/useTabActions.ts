import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { APP_SCREEN } from '@src/navigator/ScreenTypes';
import { navigate } from '@src/navigator';

// Định nghĩa các action type cho mỗi tab
export interface TabAction {
  title: string;
  action: () => void;
}

export interface TabActionsConfig {
  [key: string]: TabAction;
}

// Hook để quản lý các action cho plus button
export const useTabActions = () => {
  const { t } = useTranslation();

  // Hàm action cho HOME tab
  const homeAction = useCallback(() => {
    navigate(APP_SCREEN.CREATE_CUSTOMER);
  }, []);

  const productAction = useCallback(() => {
    navigate(APP_SCREEN.CREATE_PRODUCT);
  }, []);

  const categoryAction = useCallback(() => {
    navigate(APP_SCREEN.CREATE_CATEGORY);
  }, []);

  // Hàm action cho SCHEDULE tab
  const scheduleAction = useCallback(() => {
    navigate(APP_SCREEN.CREATE_SCHEDULE);
  }, []);

  // Định nghĩa các action cho từng tab với useMemo
  const tabActions: TabActionsConfig = useMemo(
    () => ({
      [APP_SCREEN.CUSTOMER_LIST]: {
        title: t('action.add.customer'),
        action: homeAction,
      },
      [APP_SCREEN.SCHEDULE]: {
        title: t('action.add.appointment'),
        action: scheduleAction,
      },
      [APP_SCREEN.PRODUCT_SCREEN]: {
        title: t('action.add.product'),
        action: productAction,
      },
      [APP_SCREEN.CATEGORY_SCREEN]: {
        title: t('action.category.product'),
        action: categoryAction,
      },
    }),
    [categoryAction, homeAction, productAction, scheduleAction, t],
  );

  // Hàm để lấy action cho tab hiện tại
  const getActionForTab = useCallback(
    (currentTab: string): TabAction => {
      return (
        tabActions[currentTab] || {
          title: t('action.default'),
          action: () => {
            Alert.alert(t('notification'), t('action.default.message'));
          },
        }
      );
    },
    [tabActions, t],
  );

  return {
    getActionForTab,
    tabActions,
  };
};
