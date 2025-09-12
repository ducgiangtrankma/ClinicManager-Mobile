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

  // Hàm action cho SCHEDULE tab
  const scheduleAction = useCallback(() => {
    console.log('Action schedule tab');
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
    }),
    [homeAction, scheduleAction, t],
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
