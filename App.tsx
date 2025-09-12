import { RXStore } from '@src/common';
import { AppContainer } from '@src/navigator/AppNavigator';
import { persistor, store } from '@src/redux';
import React, { FC, Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { i18next } from '@src/utils';
import FlashMessage from 'react-native-flash-message';
import { GlobalLoading, globalLoadingRef } from '@src/components';
import { Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
interface Props {}

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setLayoutIfNeededOnUpdate(false);
  KeyboardManager.setToolbarManageBehaviourBy('position');
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.setEnableDebugging(false);
  KeyboardManager.setOverrideKeyboardAppearance(true);
  KeyboardManager.setKeyboardAppearance('default');
  KeyboardManager.setShouldPlayInputClicks(true);
  // KeyboardManager.isKeyboardShowing().then(isShowing => {});
}
const App: FC<Props> = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18next}>
            <Suspense fallback={null}>
              <AppContainer />
              <RXStore />
              <GlobalLoading ref={globalLoadingRef} />
              <FlashMessage position="top" hideOnPress={true} />
            </Suspense>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
