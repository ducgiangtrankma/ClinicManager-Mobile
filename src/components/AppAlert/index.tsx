import { sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import i18next from 'i18next';
import { showMessage, MessageType } from 'react-native-flash-message';

export const showToast = (
  type: MessageType,
  message: string,
  description: string | undefined,
  icon: MessageType,
  duration: number | 1000,
) => {
  showMessage({
    description,
    message,
    type,
    icon: icon,
    position: 'top',
    titleStyle: { fontSize: sizes._14sdp, fontWeight: '500' },
    duration,
  });
};

type TranslationOptions = Record<string, string | number>;
export const showErrorMessage = (
  messageKey?: TranslationKeys,
  descriptionKey?: TranslationKeys | string,
  duration?: number,
  messageOptions?: TranslationOptions,
  descriptionOptions?: TranslationOptions,
) => {
  showToast(
    'danger',
    messageKey
      ? i18next.t(messageKey, messageOptions)
      : i18next.t('common.error.title'),
    descriptionKey
      ? i18next.t(descriptionKey, descriptionOptions)
      : i18next.t('common.error.description'),
    'danger',
    duration || 1850,
  );
};

export const showSuccessMessage = (
  messageKey?: TranslationKeys,
  descriptionKey?: TranslationKeys,
  duration?: number,
) => {
  showToast(
    'success',
    messageKey ? i18next.t(messageKey) : i18next.t('common.success.title'),
    descriptionKey
      ? i18next.t(descriptionKey)
      : i18next.t('common.success.description'),
    'success',
    duration || 1850,
  );
};
