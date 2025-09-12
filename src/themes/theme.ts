import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { DarkColors, LightColors } from './color';
import { DarkImage, LightImage } from '@src/assets';

export const getAppTheme = () => ({
  light: {
    Colors: LightColors,
    Images: LightImage,
    NavigationTheme: DefaultTheme,
  },
  dark: {
    Colors: DarkColors,
    Images: DarkImage,
    NavigationTheme: DarkTheme,
  },
});
