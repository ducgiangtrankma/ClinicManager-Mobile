import React, { FC, ReactNode, useMemo } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { sizes } from '../../utils/sizes';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@src/common';
import TranslationKeys from '@src/utils/translations/i18n-type';
import { APP_FONTS } from '@src/themes';
interface DefaultTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  fontFamily?:
    | 'content_bold'
    | 'content_semibold'
    | 'content_medium'
    | 'content_regular'
    | 'content_italic';
  fontSize?:
    | '8'
    | '10'
    | '12'
    | '14'
    | '16'
    | '18'
    | '20'
    | '24'
    | '28'
    | '32'
    | '40'
    | '48';
  translationKey?: TranslationKeys;
  children?: ReactNode; // Cho phép truyền văn bản trực tiếp
  textAlign?: 'auto' | 'center' | 'right';
  color?: string;
  margin?: {
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
  };
}
const setFontSize = (size: string) => {
  if (size) {
    switch (size) {
      case '8':
        return sizes._8sdp;
      case '10':
        return sizes._10sdp;
      case '12':
        return sizes._12sdp;
      case '14':
        return sizes._14sdp;
      case '16':
        return sizes._16sdp;
      case '18':
        return sizes._18sdp;
      case '20':
        return sizes._20sdp;
      case '24':
        return sizes._24sdp;
      case '28':
        return sizes._28sdp;
      case '32':
        return sizes._32sdp;
      case '40':
        return sizes._40sdp;
      case '48':
        return sizes._48sdp;
      default:
        return sizes._14sdp;
    }
  }
  return sizes._14sdp;
};
const setFontFamily = (font: string) => {
  switch (font) {
    case 'content_bold':
      return APP_FONTS.content_bold;
    case 'content_semibold':
      return APP_FONTS.content_semibold;
    case 'content_medium':
      return APP_FONTS.content_medium;
    case 'content_regular':
      return APP_FONTS.content_regular;
    case 'content_italic':
      return APP_FONTS.content_italic;
    default:
      return APP_FONTS.content_regular;
  }
};

export const AppText: FC<DefaultTextProps> = ({
  translationKey,
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();
  let displayText;
  if (translationKey && children) {
    displayText = t(translationKey) + children;
  } else {
    displayText = translationKey ? t(translationKey) : children;
  }
  const marginStyles = useMemo(() => {
    return {
      marginTop: props.margin?.mt || 0,
      marginBottom: props.margin?.mb || 0,
      marginLeft: props.margin?.ml || 0,
      marginRight: props.margin?.mr || 0,
    };
  }, [props.margin]);
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        {
          color: props.color ?? Colors.defaultTextColor,
          fontSize: setFontSize(props.fontSize ?? '16'),
          fontFamily: setFontFamily(props.fontFamily ?? 'content_regular'),
          textAlign: props.textAlign ?? 'auto',
        },
        marginStyles,
        props.style,
      ]}
    >
      {displayText}
    </Text>
  );
};
