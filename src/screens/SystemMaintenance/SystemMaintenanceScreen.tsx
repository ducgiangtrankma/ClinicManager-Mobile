import { useAppTheme } from '@src/common';
import { AppText, PageContainer } from '@src/components';
import { _screen_width, sizes } from '@src/utils';
import React, { FC } from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {}
export const SystemMaintenanceScreen: FC<Props> = () => {
  const { Images } = useAppTheme();
  return (
    <PageContainer style={styles.container}>
      <Image source={Images.appLogo} style={styles.logo} resizeMode="contain" />
      <AppText translationKey="system_mode_title" fontFamily="content_bold" />
      <AppText translationKey="system_mode" textAlign="center" fontSize="12" />
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: sizes._8sdp,
  },
  logo: {
    width: _screen_width * 0.8,
    height: 'auto',
    aspectRatio: 1,
  },
});
