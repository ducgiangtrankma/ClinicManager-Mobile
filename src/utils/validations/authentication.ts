import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { emailRegex, otpRegex, passwordRegex } from '../regex';

export const signUpValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    email: Yup.string()
      .required(t('email_is_required'))
      .matches(emailRegex, t('email_not_valid')),
    password: Yup.string()
      .required(t('password_is_required'))
      .matches(passwordRegex, t('password_not_valid')),
    confirmPassword: Yup.string()
      .required(t('confirm_password_is_required'))
      .oneOf([Yup.ref('password')], t('passwords_do_not_match')),
  });
export const signInValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    email: Yup.string()
      .required(t('email_is_required'))
      .matches(emailRegex, t('email_not_valid')),
    password: Yup.string()
      .required(t('password_is_required'))
      .matches(passwordRegex, t('password_not_valid')),
  });
export const changePasswordValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    currentPassword: Yup.string()
      .required(t('password_is_required'))
      .matches(passwordRegex, t('password_not_valid')),
    newPassword: Yup.string()
      .required(t('password_is_required'))
      .matches(passwordRegex, t('password_not_valid')),
    confirmNewPassword: Yup.string()
      .required(t('confirm_password_is_required'))
      .oneOf([Yup.ref('newPassword')], t('passwords_do_not_match')),
  });
export const otpValidationSchema = (t: TFunction<'translation', undefined>) =>
  Yup.object().shape({
    otp: Yup.string()
      .required(t('otp_is_required'))
      .matches(otpRegex, t('otp_not_valid')),
  });
export const emailValidationSchema = (t: TFunction<'translation', undefined>) =>
  Yup.object().shape({
    email: Yup.string()
      .required(t('email_is_required'))
      .matches(emailRegex, t('email_not_valid')),
  });
export const updatePasswordValidationSchema = (
  t: TFunction<'translation', undefined>,
) =>
  Yup.object().shape({
    otp: Yup.string()
      .required(t('otp_is_required'))
      .matches(otpRegex, t('otp_not_valid')),
    password: Yup.string()
      .required(t('password_is_required'))
      .matches(passwordRegex, t('password_not_valid')),
    confirmPassword: Yup.string()
      .required(t('confirm_password_is_required'))
      .oneOf([Yup.ref('password')], t('passwords_do_not_match')),
  });
