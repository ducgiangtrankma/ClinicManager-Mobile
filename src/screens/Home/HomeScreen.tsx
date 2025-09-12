import { dispatch, useAppTheme, useSelector } from '@src/common';
import { AppText } from '@src/components';

import { AppLanguage } from '@src/models';
import { onChangeAppTheme, onChangeLanguage } from '@src/redux';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}
export const HomeScreen: FC<Props> = () => {
  const { appLanguage } = useSelector(x => x.languageReducer);
  const { Colors, Images } = useAppTheme();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={Images.avt}
        style={{ width: sizes._24sdp, height: sizes._24sdp }}
      />
      <Text>HomeScreen - {appLanguage}</Text>
      <TouchableOpacity
        onPress={() => dispatch(onChangeLanguage(AppLanguage.vi))}
      >
        <Text>Set name VI</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(onChangeLanguage(AppLanguage.en))}
      >
        <Text>Set name EN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(onChangeAppTheme())}
        style={{
          width: sizes._300sdp,
          height: sizes._48sdp,
          backgroundColor: Colors.background,
        }}
      >
        <AppText>Default font</AppText>
        <AppText fontFamily="content_bold">Default font</AppText>
        <AppText fontFamily="content_semibold">semibold font</AppText>
        <AppText fontFamily="content_regular">regular font</AppText>
        <AppText fontFamily="content_medium">medium font</AppText>
        <AppText fontFamily="content_italic">italic font</AppText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
