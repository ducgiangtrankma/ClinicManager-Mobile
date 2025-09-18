import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { _screen_width, sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  description: TranslationKeys;
}
export const EmptyList: FC<Props> = ({ description }) => {
  const { Images } = useAppTheme();
  return (
    <Box align="center">
      <Image source={Images.emptyList} style={styles.emptyImg} />
      <AppText
        translationKey={description}
        margin={{ ml: sizes._48sdp, mr: sizes._48sdp }}
        textAlign="center"
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  emptyImg: {
    width: _screen_width * 0.4,
    height: 'auto',
    aspectRatio: 1,
  },
  container: {
    flex: 1,
  },
});
