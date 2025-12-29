import { NavigationContainer } from '@react-navigation/native';
import { dispatch, RXStore, useSelector } from '@src/common';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { navigationRef } from './NavigationServices';
import { RootNavigation } from './RootNavigation';
import { Alert, AppState, Linking, Platform, View } from 'react-native';
import { checkUpdateApp } from '@src/utils';
import { SettingService } from '@src/services';
import { onSetSystemConfig } from '@src/redux';
import { SystemMaintenanceScreen } from '@src/screens';

export const AppContainer = () => {
  const [navigationReady, setNavigationReady] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const appLanguage = useSelector(x => x.languageReducer.appLanguage);

  const appState = useRef(AppState.currentState);
  const [isForceUpdate, setIsForeUpdate] = useState<boolean>(false);
  const [system_maintenance, setSystem_maintenance] = useState<boolean>(false);

  useEffect(() => {
    i18n.changeLanguage(appLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLanguage]);

  useEffect(() => {
    const fetchSetting = () => {
      SettingService.getSystemSetting()
        .then(res => {
          const { iosNewVersion, androidNewVersion, systemMaintenance } =
            res.data;
          const forceUpdateApp = checkUpdateApp(res.data);
          if (forceUpdateApp) {
            setIsForeUpdate(true);
            Alert.alert(
              'Thông báo',
              'Phiên bản của bạn đã cũ, vui lòng cập nhật ứng dụng',
              [
                {
                  text: 'Cập nhật',
                  onPress: () => {
                    if (Platform.OS === 'ios') {
                      Linking.openURL(iosNewVersion.urlUpdate);
                    } else {
                      Linking.openURL(androidNewVersion.urlUpdate);
                    }
                  },
                },
              ],
            );
          }
          setIsForeUpdate(false);
          setSystem_maintenance(systemMaintenance ?? false);
          dispatch(onSetSystemConfig(res.data));
        })
        .catch(() => {
          setSystem_maintenance(true);
        });
    };

    // gọi khi mở app
    fetchSetting();

    // gọi lại khi app resume
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        fetchSetting();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setNavigationReady(true);
      }}
    >
      {system_maintenance ? (
        <SystemMaintenanceScreen />
      ) : (
        <>
          {isForceUpdate ? (
            <View />
          ) : (
            <>
              <RootNavigation />
              {navigationReady && <RXStore />}
            </>
          )}
        </>
      )}
    </NavigationContainer>
  );
};
