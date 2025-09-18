import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import languageReducer from '../reducer/languageReducer';
import appThemeReducer from '../reducer/app-theme.reducer';
import facilityReducer from '../reducer/facility-reducer';
import appReducer from '../reducer/app.reducer';

const middleware: any = [];
middleware.push(createLogger());
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['languageReducer'], // Persist language state
  blacklist: [],
};
const rootReducer = combineReducers({
  languageReducer: languageReducer,
  appThemeReducer: appThemeReducer,
  facilityReducer: facilityReducer,
  appReducer: appReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware), // Nếu không muốn hiển thị redux-logger thì bỏ concat(middleware)
});
const persistor = persistStore(store);

export { persistor, store };
export type RootState = ReturnType<typeof rootReducer>;
