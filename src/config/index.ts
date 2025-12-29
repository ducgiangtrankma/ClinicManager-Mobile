import Config from 'react-native-config';
export const AppConfig = {
  env: Config.ENV,
  appName: Config.APP_NAME,
  apiUrl: Config.API_URL,
  androidVersion: Config.ANDROID_UPDATE_VERSION_CODE,
  iosVersion: Config.IOS_UPDATE_VERSION_CODE,
};
