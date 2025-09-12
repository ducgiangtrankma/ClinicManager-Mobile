import { NavigationContainer } from '@react-navigation/native';
import { RXStore, useSelector } from '@src/common';
import { RootNavigation } from './RootNavigation';
import React, { useEffect, useState } from 'react';
import { navigationRef } from './NavigationServices';
import { useTranslation } from 'react-i18next';

export const AppContainer = () => {
  const [navigationReady, setNavigationReady] = useState<boolean>(false);
  const { i18n } = useTranslation();
  const appLanguage = useSelector(x => x.languageReducer.appLanguage);
  useEffect(() => {
    i18n.changeLanguage(appLanguage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLanguage]);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        setNavigationReady(true);
      }}
    >
      <RootNavigation />
      {navigationReady && <RXStore />}
    </NavigationContainer>
  );
};
