import { dispatch, useAppTheme } from '@src/common';
import {
  AppButton,
  AppInput,
  AppText,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
} from '@src/components';
import { APP_SCREEN, navigate, RootStackParamList } from '@src/navigator';
import { onSetToken, onSetUser } from '@src/redux';

import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import {
  AuthFormValuesEntity,
  SignInFormValuesEntity,
  SignUpFormValuesEntity,
} from '@src/models';
import { AuthenticationService } from '@src/services';
import {
  ACTIVE_OPACITY_TOUCH,
  signInValidationSchema,
  signUpValidationSchema,
  sizes,
} from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from 'react-native-reanimated';
import { styles } from './style';
interface Props {}

export const SignInScreen: FC<Props> = () => {
  const route = useRoute<RouteProp<RootStackParamList, APP_SCREEN.SIGNIN>>();
  const defaultEmail = route.params?.email;

  const { t } = useTranslation();
  const { Images, Colors } = useAppTheme();
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const validationSignInSchema = signInValidationSchema(t);
  const validationSignUpSchema = signUpValidationSchema(t);

  const initialSignInValues: SignInFormValuesEntity = {
    email: defaultEmail ?? 'tranducgiangact@gmail.com',
    password: '1234567a',
  };
  const initialSignUpValues: SignUpFormValuesEntity = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  const _handleSignIn = useCallback(async (value: SignInFormValuesEntity) => {
    try {
      const { email, password } = value;
      globalLoading.show();
      const response = await AuthenticationService.signIn({
        email,
        password,
      });
      dispatch(
        onSetToken({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
      dispatch(
        onSetUser({
          user: response.data.user,
        }),
      );
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, []);

  const _handleSignUp = useCallback(async (value: SignUpFormValuesEntity) => {
    try {
      const { email, password } = value;
      globalLoading.show();
      await AuthenticationService.register({
        email,
        password,
      });
      navigate(APP_SCREEN.VERIFY_OTP, {
        email: value.email,
      });
    } catch (error: any) {
      console.log('error.message', error.message);
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.signInMode) {
        setIsRegisterMode(false);
      }
      return () => {};
    }, [route.params?.signInMode]),
  );

  return (
    <PageContainer style={styles.container} padding>
      <Box direction="horizontal" justify="space-between" align="center">
        <Box>
          <AppText
            translationKey={isRegisterMode ? 'sign_up_title' : 'sign_in_title'}
            fontFamily="content_bold"
            fontSize="28"
            margin={{ mb: sizes._6sdp }}
            style={{ letterSpacing: sizes._2sdp }}
          />
          <AppText>Beauty & Clinic Manager</AppText>
        </Box>
        <Image source={Images.appLogo} style={styles.logo} />
      </Box>
      <Formik<AuthFormValuesEntity>
        initialValues={
          isRegisterMode ? initialSignUpValues : initialSignInValues
        }
        enableReinitialize
        validationSchema={
          isRegisterMode ? validationSignUpSchema : validationSignInSchema
        }
        onSubmit={values => {
          if (isRegisterMode) {
            _handleSignUp(values as SignUpFormValuesEntity);
          } else {
            _handleSignIn(values as SignInFormValuesEntity);
          }
        }}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <React.Fragment>
            {/* Email/Nickname Input Container */}
            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              style={styles.inputContainer}
            >
              {isRegisterMode ? (
                <Box gap={sizes._16sdp}>
                  <Animated.View
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(500)}
                    exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                    style={styles.inputWrapper}
                  >
                    <Box gap={sizes._8sdp}>
                      <AppText fontFamily="content_medium">Email</AppText>
                      <AppInput
                        value={values.email}
                        onChangeText={value => setFieldValue('email', value)}
                        placeholder={t('email_placeholder')}
                        errMessage={errors.email}
                      />
                    </Box>
                  </Animated.View>
                </Box>
              ) : (
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(500)}
                  exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                  style={styles.inputWrapper}
                >
                  <Box gap={sizes._8sdp}>
                    <AppText fontFamily="content_medium">Email</AppText>
                    <AppInput
                      value={values.email}
                      onChangeText={value => setFieldValue('email', value)}
                      placeholder={t('email_placeholder')}
                      errMessage={errors.email}
                    />
                  </Box>
                </Animated.View>
              )}
            </Animated.View>

            {/* Password Input */}
            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              style={styles.inputContainer}
            >
              <Box gap={sizes._8sdp}>
                <AppText
                  translationKey="password"
                  fontFamily="content_medium"
                />
                <AppInput
                  secureTextEntry
                  value={values.password}
                  onChangeText={value => setFieldValue('password', value)}
                  placeholder={t('password_placeholder')}
                  errMessage={errors.password}
                />
              </Box>
              {!isRegisterMode && (
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(500)}
                  exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                  style={styles.forgotPasswordContainer}
                >
                  <TouchableOpacity
                    hitSlop={{
                      top: sizes._8sdp,
                      bottom: sizes._8sdp,
                      left: sizes._8sdp,
                      right: sizes._8sdp,
                    }}
                    activeOpacity={ACTIVE_OPACITY_TOUCH}
                    onPress={() => navigate(APP_SCREEN.FORGOT_PASSWORD)}
                    style={styles.forgotPasswordButton}
                  >
                    <AppText
                      translationKey="sign_in_forgot_password"
                      color={Colors.green}
                      fontFamily="content_semibold"
                      margin={{ mt: sizes._16sdp }}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )}
            </Animated.View>

            {/* Confirm Password Input */}
            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              style={styles.inputContainer}
            >
              {isRegisterMode && (
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(500)}
                  exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                  style={styles.inputWrapper}
                >
                  <Box gap={sizes._8sdp}>
                    <AppText
                      translationKey="confirm_password"
                      fontFamily="content_medium"
                    />
                    <AppInput
                      value={values.confirmPassword ?? ''}
                      secureTextEntry
                      onChangeText={value =>
                        setFieldValue('confirmPassword', value)
                      }
                      placeholder={t('password_confirm_placeholder')}
                      errMessage={errors.confirmPassword ?? ''}
                    />
                  </Box>
                </Animated.View>
              )}
            </Animated.View>

            {/* Button */}
            <Animated.View
              style={{ marginTop: sizes._16sdp }}
              entering={FadeInDown.springify().damping(80).stiffness(500)}
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              <AppButton
                onPress={() => {
                  handleSubmit();
                }}
                title={
                  isRegisterMode
                    ? 'sign_up_button_title'
                    : 'sign_in_button_title'
                }
              />
            </Animated.View>

            {/* Register Link */}
            <Animated.View
              entering={FadeInDown.springify().damping(80).stiffness(500)}
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              <Box
                direction="horizontal"
                align="center"
                gap={sizes._4sdp}
                style={styles.register}
              >
                <AppText
                  translationKey={
                    isRegisterMode ? 'already_account' : 'sign_in_not_account'
                  }
                />
                <TouchableOpacity
                  hitSlop={{
                    top: sizes._24sdp,
                    bottom: sizes._24sdp,
                    left: sizes._24sdp,
                    right: sizes._24sdp,
                  }}
                  activeOpacity={ACTIVE_OPACITY_TOUCH}
                  onPress={() => setIsRegisterMode(!isRegisterMode)}
                >
                  <AppText
                    translationKey={
                      isRegisterMode
                        ? 'already_account_signIn'
                        : 'sign_in_register'
                    }
                    color={Colors.green}
                    fontFamily="content_semibold"
                  />
                </TouchableOpacity>
              </Box>
            </Animated.View>
          </React.Fragment>
        )}
      </Formik>
    </PageContainer>
  );
};
