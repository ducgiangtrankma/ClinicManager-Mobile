import { RXStore } from '@src/common';
import { AppContainer } from '@src/navigator/AppNavigator';
import { persistor, store } from '@src/redux';
import React, { FC, Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { i18next } from '@src/utils';
interface Props {}
const App: FC<Props> = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18next}>
            <Suspense fallback={null}>
              <AppContainer />
              <RXStore />
            </Suspense>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
