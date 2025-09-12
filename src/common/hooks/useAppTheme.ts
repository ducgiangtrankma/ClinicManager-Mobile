import { ImageSourcePropType } from 'react-native';
import { useSelector } from './useSelector';
import { AppThemeEntity } from '@src/models';
import { getAppTheme } from '@src/themes/theme';

export function useAppTheme() {
  const appTheme = useSelector(x => x.appThemeReducer.appTheme);
  const isDark = appTheme === AppThemeEntity.dark;
  return mergeAppTheme(isDark, getAppTheme());
}
const mergeAppTheme = (
  isDark: boolean,
  theme: ReturnType<typeof getAppTheme>,
) => {
  type ImageKey =
    | keyof typeof theme.light.Images
    | keyof typeof theme.dark.Images;
  type ColorKey =
    | keyof typeof theme.light.Colors
    | keyof typeof theme.dark.Colors;

  const primaryTheme = isDark ? theme.dark : theme.light;
  const secondaryTheme = isDark ? theme.light : theme.dark;
  const mergedColors: { [key in ColorKey]: string } = {
    ...secondaryTheme.Colors,
    ...primaryTheme.Colors,
  } as any;
  const mergedImages: { [key in ImageKey]: ImageSourcePropType } = {
    ...secondaryTheme.Images,
    ...primaryTheme.Images,
  } as any;
  return {
    ...primaryTheme,
    Colors: mergedColors,
    Images: mergedImages,
    IsDark: isDark,
  };
};
