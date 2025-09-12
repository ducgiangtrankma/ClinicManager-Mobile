import { useAppTheme } from '@src/common';
import { sizes } from '@src/utils';
import React, { FC, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '../AppText';
import { PasswordHideInputIcon, PasswordShowInputIcon } from '@src/assets';
import { APP_FONTS } from '@src/themes';

interface Props extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onBlurEvent?: () => void;
  placeholder?: string;
  onChangeText: (value: string) => void;
  errMessage?: string;
  secureTextEntry?: boolean;
  onFocusEvent?: () => void;
}
export const AppInput: FC<Props> = ({
  style,
  leftIcon,
  rightIcon,
  onBlurEvent,
  placeholder,
  onChangeText,
  errMessage,
  secureTextEntry,
  onFocusEvent,
  ...props
}) => {
  const { Colors } = useAppTheme();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [showPassword, setShowPassWord] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isFocus
              ? Colors.inputFocusBackground
              : Colors.inputBackground,
            borderWidth: sizes._1sdp,
            borderColor: isFocus
              ? Colors.inputFocusBorder
              : Colors.inputOutFocusBorder,
          },
          style,
        ]}
      >
        {leftIcon && (
          <View style={{ marginRight: sizes._12sdp }}>{leftIcon}</View>
        )}
        <TextInput
          {...props}
          style={[
            styles.input,
            {
              fontFamily: APP_FONTS.content_regular,
            },
            {
              color: Colors.defaultTextColor,
            },
          ]}
          placeholder={placeholder ?? 'Input'}
          onFocus={() => {
            setIsFocus(true);
            onFocusEvent && onFocusEvent();
          }}
          placeholderTextColor={Colors.inputPlaceholderText}
          onBlur={() => {
            onBlurEvent && onBlurEvent();
            setIsFocus(false);
            // chỉ trim khi blur
            onChangeText(props.value?.trim() ?? '');
          }}
          onChangeText={value => {
            onChangeText(value);
          }}
          secureTextEntry={secureTextEntry ? showPassword : false}
          // textAlignVertical={props.multiline ? 'top' : 'auto'}
          textAlignVertical="top"
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={{ marginLeft: sizes._12sdp }}
            onPress={() => setShowPassWord(!showPassword)}
          >
            {showPassword ? (
              <PasswordHideInputIcon />
            ) : (
              <PasswordShowInputIcon />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <View style={{ marginLeft: sizes._12sdp }}>{rightIcon}</View>
        )}
      </View>
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
