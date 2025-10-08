import { ArrowDownIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '../AppText';
import { useTranslation } from 'react-i18next';

interface Props {
  style?: StyleProp<ViewStyle>;
  placeholder?: TranslationKeys;
  errMessage?: string;
  secureTextEntry?: boolean;
  onPress: () => void;
  value: { id: string; label: string; value: string } | undefined;
}
export const AppSelectForm: FC<Props> = ({
  style,
  placeholder,
  value,
  errMessage,
  onPress,
  ...props
}) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={ACTIVE_OPACITY_TOUCH}
        style={[
          styles.inputContainer,
          {
            borderWidth: sizes._1sdp,
            borderColor: Colors.inputOutFocusBorder,
          },
          style,
        ]}
      >
        <View {...props} style={[styles.input]}>
          {value ? (
            <AppText>{t(value.label)}</AppText>
          ) : (
            <AppText numberOfLines={1} translationKey={placeholder} />
          )}
        </View>
        <ArrowDownIcon />
      </TouchableOpacity>
      {errMessage && (
        <AppText
          fontSize="12"
          style={[styles.errMessage, { color: Colors.error }]}
        >
          {errMessage}
        </AppText>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    height: sizes._56sdp,
    borderRadius: sizes._16sdp,
    paddingHorizontal: sizes._20sdp,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  errMessage: {
    marginTop: sizes._4sdp,
    marginBottom: sizes._12sdp,
    marginLeft: sizes._3sdp,
  },
});
