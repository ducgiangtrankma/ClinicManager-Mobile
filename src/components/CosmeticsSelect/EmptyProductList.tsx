import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { APP_SCREEN, navigate } from '@src/navigator';
import { _screen_width, sizes } from '@src/utils';
import TranslationKeys from '@src/utils/translations/i18n-type';
import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  description: TranslationKeys;
}
export const EmptyListProduct: FC<Props> = ({ description }) => {
  const { Images, Colors } = useAppTheme();
  return (
    <Box align="center">
      <Image source={Images.emptyList} style={styles.emptyImg} />
      <AppText
        translationKey={description}
        margin={{ ml: sizes._48sdp, mr: sizes._48sdp }}
        textAlign="center"
      />
      <TouchableOpacity
        style={{ marginTop: sizes._24sdp }}
        onPress={() => navigate(APP_SCREEN.WAREHOUSE_MODULE)}
      >
        <AppText
          fontFamily="content_bold"
          style={styles.title}
          color={Colors.green}
          translationKey="add_product"
        />
      </TouchableOpacity>
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
  title: {
    textDecorationLine: 'underline',
  },
});
