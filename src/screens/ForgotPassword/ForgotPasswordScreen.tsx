import { StackActions, useNavigation } from '@react-navigation/native';
import { InfoIcon, LeftArrowIcon } from '@src/assets';
import {
  AppButton,
  AppInput,
  AppText,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
} from '@src/components';
import {
  ForgotPasswordValuesEntity,
  ForgotValuesEntity,
  UpdatePasswordValuesEntity,
} from '@src/models';
import { APP_SCREEN, goBack, navigate } from '@src/navigator';
import { AuthenticationService } from '@src/services';
import {
  ACTIVE_OPACITY_TOUCH,
  emailValidationSchema,
  sizes,
  updatePasswordValidationSchema,
} from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Props {}
export const ForgotPasswordScreen: FC<Props> = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isUpdatePassword, setIsUpdatePassword] = useState<boolean>(false);
  const [saveEmail, setSaveEmail] = useState<string>('');
  const insert = useSafeAreaInsets();

  const validationForgotPasswordSchema = emailValidationSchema(t);
  const validationUpdatePasswordSchema = updatePasswordValidationSchema(t);

  const initialForgotValues: ForgotPasswordValuesEntity = {
    email: '',
  };

  const initialUpdatePasswordValues: UpdatePasswordValuesEntity = {
    otp: '',
    password: '',
    confirmPassword: '',
  };
  const handleSendOtp = useCallback(async (email: string) => {
    try {
      if (email) {
        globalLoading.show();
        await AuthenticationService.forgotPassword({ email });
        setIsUpdatePassword(true);
        setSaveEmail(email);
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, []);

  const handleUpdatePassword = useCallback(
    async (otp: string, password: string) => {
      try {
        if (saveEmail && otp && password) {
          globalLoading.show();
          await AuthenticationService.updatePasswordByForgot({
            email: saveEmail,
            otp,
            password,
          });
          navigation.dispatch(StackActions.pop(2));
          navigate(APP_SCREEN.SIGNIN, {
            email: saveEmail,
            signInMode: true,
          });
        }
      } catch (error: any) {
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [navigation, saveEmail],
  );

  return (
    <PageContainer style={styles.container} padding>
      <Animated.View
        entering={FadeInRight.springify().damping(80).stiffness(500)}
        exiting={FadeOutRight.springify().damping(80).stiffness(500)}
      >
        <TouchableOpacity
          hitSlop={{
            top: sizes._24sdp,
            bottom: sizes._24sdp,
            left: sizes._24sdp,
            right: sizes._24sdp,
          }}
          style={styles.backButton}
          onPress={() => {
            if (isUpdatePassword) {
              setIsUpdatePassword(false);
              return;
            }
            goBack();
          }}
        >
          <LeftArrowIcon />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        entering={FadeInRight.springify().damping(80).stiffness(500)}
        exiting={FadeOutRight.springify().damping(80).stiffness(500)}
      >
        <AppText
          translationKey="forgotPassword_title"
          fontFamily="content_bold"
          fontSize="28"
          margin={{ mb: sizes._24sdp, mt: sizes._16sdp }}
        />
      </Animated.View>

      <Formik<ForgotValuesEntity>
        initialValues={
          isUpdatePassword ? initialUpdatePasswordValues : initialForgotValues
        }
        enableReinitialize
        validationSchema={
          isUpdatePassword
            ? validationUpdatePasswordSchema
            : validationForgotPasswordSchema
        }
        onSubmit={values => {
          if (isUpdatePassword) {
            handleUpdatePassword(values.otp ?? '', values.password ?? '');
          } else {
            handleSendOtp(values.email ?? '');
          }
        }}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <React.Fragment>
            {/* Email Input Container */}
            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              style={styles.inputContainer}
            >
              {!isUpdatePassword ? (
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(500)}
                  exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                  style={styles.inputWrapper}
                >
                  <Box gap={sizes._8sdp}>
                    <AppText fontFamily="content_medium">Email</AppText>
                    <AppInput
                      value={values?.email ?? ''}
                      onChangeText={value => setFieldValue('email', value)}
                      placeholder={t('email_placeholder')}
                      errMessage={errors.email ?? ''}
                    />
                  </Box>
                </Animated.View>
              ) : null}
            </Animated.View>

            {/* Description Container */}
            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              {!isUpdatePassword ? (
                <Animated.View
                  entering={FadeInRight.springify().damping(80).stiffness(500)}
                  exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                >
                  <AppText
                    translationKey="forgotPassword_description"
                    textAlign="center"
                  />
                </Animated.View>
              ) : null}
            </Animated.View>

            {/* Password Input Container */}
            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
            >
              {isUpdatePassword ? (
                <Box gap={sizes._16sdp}>
                  <Animated.View
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(500)}
                    exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                    style={styles.inputWrapper}
                  >
                    <Box gap={sizes._8sdp}>
                      <AppText fontFamily="content_medium">Password</AppText>
                      <AppInput
                        value={values.password}
                        errMessage={errors.password}
                        secureTextEntry
                        onChangeText={value => setFieldValue('password', value)}
                        placeholder="Enter your password"
                      />
                    </Box>
                  </Animated.View>
                  <Animated.View
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(500)
                      .delay(100)}
                    exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                    style={styles.inputWrapper}
                  >
                    <Box gap={sizes._8sdp}>
                      <AppText fontFamily="content_medium">
                        Confirm Password
                      </AppText>
                      <AppInput
                        value={values.confirmPassword}
                        errMessage={errors.confirmPassword}
                        secureTextEntry
                        onChangeText={value =>
                          setFieldValue('confirmPassword', value)
                        }
                        placeholder="Enter your password"
                      />
                    </Box>
                  </Animated.View>
                  <Animated.View
                    entering={FadeInRight.springify()
                      .damping(80)
                      .stiffness(500)
                      .delay(200)}
                    exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
                    style={styles.inputWrapper}
                  >
                    <Box gap={sizes._8sdp}>
                      <Box
                        direction="horizontal"
                        align="center"
                        gap={sizes._8sdp}
                      >
                        <AppText fontFamily="content_medium">
                          Verify Code
                        </AppText>
                        <TouchableOpacity activeOpacity={ACTIVE_OPACITY_TOUCH}>
                          <InfoIcon size={sizes._24sdp} />
                        </TouchableOpacity>
                      </Box>
                      <AppInput
                        value={values.otp}
                        errMessage={errors.otp}
                        onChangeText={value => setFieldValue('otp', value)}
                        placeholder="Enter verify code"
                      />
                    </Box>
                  </Animated.View>
                </Box>
              ) : null}
            </Animated.View>

            <Animated.View
              layout={LinearTransition.springify().damping(80).stiffness(200)}
              style={[
                styles.actionButton,
                {
                  bottom:
                    Platform.OS === 'ios'
                      ? insert.bottom
                      : insert.bottom + sizes._16sdp,
                },
              ]}
            >
              <AppButton
                title={
                  isUpdatePassword
                    ? 'forgotPassword_update_pass'
                    : 'forgotPassword_send_otp'
                }
                onPress={() => handleSubmit()}
              />
            </Animated.View>
          </React.Fragment>
        )}
      </Formik>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    height: sizes._48sdp,
    width: sizes._48sdp,
    justifyContent: 'center',
  },
  inputWrapper: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: sizes._16sdp,
  },

  actionButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
