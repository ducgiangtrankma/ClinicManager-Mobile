import { AppText, Box } from '@src/components';
import { formatMoney } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC } from 'react';

interface Props {
  title: TranslationKeys;
  value: string | number;
}
export const SummaryContent: FC<Props> = ({ title, value }) => {
  return (
    <Box horizontal justify="space-between">
      <AppText translationKey={title} />
      <AppText fontFamily="content_bold">{formatMoney(value)}</AppText>
    </Box>
  );
};
