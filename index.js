/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';
import { AppConfig } from '@src/config';
CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/${AppConfig.appName}_images_cache/`,
  // blurRadius: 15, // 	Mức độ làm mờ ảnh thumbnail
  cacheLimit: 20, // Số ảnh tối đa được cache - 0 là không giới hạn
  maxRetries: 1, //	Số lần thử tải lại ảnh nếu lỗi
  retryDelay: 2000, //Thời gian chờ giữa các lần retry - ms
  sourceAnimationDuration: 1000, //Thời gian hiệu ứng ảnh chính -ms
  thumbnailAnimationDuration: 1000, // Thời gian hiệu ứng ảnh thumbnail - ms
};
AppRegistry.registerComponent(appName, () => App);
