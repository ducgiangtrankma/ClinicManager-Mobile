import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  AppButton,
  AppInput,
  AppText,
  BackButton,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
} from '@src/components';
import { APP_SCREEN, navigate, RootStackParamList } from '@src/navigator';
import { AuthenticationService } from '@src/services';
import { otpValidationSchema, sizes } from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet } from 'react-native';
import Animated, {
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {}
export const VerifyOtpScreen: FC<Props> = () => {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.VERIFY_OTP>>();
  const email = route.params?.email;
  const { t } = useTranslation();
  const insert = useSafeAreaInsets();
  const initialValues = {
    otp: '',
  };
  const validationOtpSchema = otpValidationSchema(t);
  const _handleVerifyOtp = useCallback(
    async (otp: string) => {
      try {
        if (email) {
          globalLoading.show();
          await AuthenticationService.verifyOtp({
            email,
            otp,
          });
          navigation.dispatch(StackActions.pop(2));
          navigate(APP_SCREEN.SIGNIN, {
            email: email,
            signInMode: true,
          });
        }
      } catch (error: any) {
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [email, navigation],
  );
  return (
    <PageContainer style={styles.container} padding>
      <BackButton />
      <Animated.View
        entering={FadeInRight.springify().damping(80).stiffness(500)}
        exiting={FadeOutRight.springify().damping(80).stiffness(500)}
      >
        <AppText
          translationKey="verify_otp_title"
          fontFamily="content_bold"
          fontSize="28"
          margin={{ mb: sizes._24sdp, mt: sizes._16sdp }}
        />
        <AppText translationKey="verify_otp_description" />
      </Animated.View>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationOtpSchema}
        onSubmit={values => {
          _handleVerifyOtp(values.otp);
        }}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <React.Fragment>
            <Animated.View
              entering={FadeInRight.springify().damping(80).stiffness(500)}
              exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
            >
              <Box gap={sizes._8sdp}>
                <AppText
                  fontFamily="content_medium"
                  translationKey="verify_otp_input_label"
                />
                <AppInput
                  value={values.otp}
                  onChangeText={value => setFieldValue('otp', value)}
                  placeholder="OTP"
                  errMessage={errors.otp}
                  keyboardType="number-pad"
                />
              </Box>
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
                title={'verify_otp_button_title'}
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
    gap: sizes._24sdp,
  },
  actionButton: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
