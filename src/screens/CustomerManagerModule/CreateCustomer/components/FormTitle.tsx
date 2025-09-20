import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC } from 'react';

interface Props {
  title: TranslationKeys;
  required?: boolean;
}
export const FormTitle: FC<Props> = ({ title, required = false }) => {
  const { Colors } = useAppTheme();
  return (
    <Box horizontal align="center" gap={sizes._4sdp}>
      <AppText translationKey={title} fontFamily="content_semibold" />
      {required && (
        <AppText fontFamily="content_semibold" color={Colors.error}>
          *
        </AppText>
      )}
    </Box>
  );
};
