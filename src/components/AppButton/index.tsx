import { useAppTheme } from '@src/common';
import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { AppText } from '../AppText';
import TranslationKeys from '@src/utils/translations/i18n-type';
import { _screen_width, ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';

interface Props extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  title?: TranslationKeys;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  titleColor?: string;
}
export const AppButton: FC<Props> = ({
  style,
  title,
  leftIcon,
  rightIcon,
  titleColor,
  ...props
}) => {
  const { Colors } = useAppTheme();
  const showTitle = title && title !== 'empty_string';
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={ACTIVE_OPACITY_TOUCH}
      style={[
        styles.base,
        {
          backgroundColor: Colors.defaultButtonBackground,
        },
        style,
      ]}
    >
      {leftIcon}
      {showTitle && (
        <AppText
          translationKey={title}
          fontSize="16"
          fontFamily="content_semibold"
          style={{
            color: titleColor ?? Colors.defaultButtonTitle,
            marginHorizontal: sizes._16sdp,
          }}
        />
      )}
      {rightIcon}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  base: {
    width: _screen_width - sizes._48sdp,
    height: sizes._58sdp,
    borderRadius: sizes._100sdp,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
