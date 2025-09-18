import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { LocationIcon, LogoutIcon } from '@src/assets';
import { dispatch, useAppTheme, useSelector } from '@src/common';
import { AppText, Box } from '@src/components';
import { onLogout } from '@src/redux';
import { sizes } from '@src/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const DrawerContent = (props: any) => {
  const { facility } = useSelector(x => x.facilityReducer);
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <Box
          gap={sizes._8sdp}
          style={[
            styles.header,
            {
              borderBottomColor: Colors.divider,
              paddingHorizontal: sizes._16sdp,
            },
          ]}
        >
          <AppText fontFamily="content_bold">Cở sở:</AppText>
          <AppText fontFamily="content_bold" ellipsizeMode="tail">
            {facility?.name}
          </AppText>

          <Box horizontal align="center">
            <LocationIcon color={Colors.error} />
            <AppText
              fontSize="14"
              color={Colors.blackGray}
              fontFamily="content_regular"
            >
              {facility?.address}
            </AppText>
          </Box>
        </Box>

        <View style={styles.contentList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Box
        style={[
          styles.bottom,
          {
            borderTopColor: Colors.divider,
            paddingBottom: insets.bottom + sizes._16sdp,
          },
        ]}
      >
        <TouchableOpacity onPress={() => dispatch(onLogout())}>
          <Box horizontal justify="space-between">
            <Box horizontal gap={sizes._8sdp}>
              <LogoutIcon />
              <AppText fontFamily="content_semibold">Đăng xuất</AppText>
            </Box>
            <AppText textAlign="center" color={Colors.error}>
              1.0.0
            </AppText>
          </Box>
        </TouchableOpacity>
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: sizes._1sdp,
    paddingBottom: sizes._16sdp,
  },

  contentList: { flex: 1, paddingTop: sizes._16sdp },

  bottom: {
    padding: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
  },
});
