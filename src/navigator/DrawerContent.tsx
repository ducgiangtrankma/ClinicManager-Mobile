import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { LocationIcon, LogoutIcon } from '@src/assets';
import { dispatch, useAppTheme, useSelector } from '@src/common';
import { AppText, Box, globalLoading } from '@src/components';
import { onClearFacility, onLogout } from '@src/redux';
import { sizes } from '@src/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AuthenticationService } from '@src/services';
import { QueryClient } from '@tanstack/react-query';
import { AppConfig } from '@src/config';
export const queryClient = new QueryClient();
export const DrawerContent = (props: any) => {
  const { t } = useTranslation();
  const { facility } = useSelector(x => x.facilityReducer);
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const handleLogout = useCallback(async () => {
    try {
      globalLoading.show();
      queryClient.clear();
      await AuthenticationService.logout();
      dispatch(onLogout());
    } catch (error) {
      dispatch(onLogout());
    } finally {
      globalLoading.hide();
    }
  }, []);

  const deleteAccount = useCallback(async () => {
    await AuthenticationService.delete();
    await handleLogout();
  }, [handleLogout]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      t('setting_confirm_delete_account'),
      t('setting_confirm_delete_account_description'),
      [
        {
          text: t('setting_cancel_delete'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('setting_summit_delete'),
          onPress: () => {
            deleteAccount();
          },
        },
      ],
    );
  }, [deleteAccount, t]);
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
        <TouchableOpacity
          onPress={handleDeleteAccount}
          hitSlop={{
            right: sizes._64sdp,
            left: sizes._24sdp,
          }}
        >
          <AppText
            margin={{ mt: sizes._8sdp, mb: sizes._16sdp }}
            translationKey="setting_delete_account"
            color={Colors.error}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dispatch(onClearFacility());
            dispatch(onLogout());
          }}
        >
          <Box horizontal justify="space-between">
            <Box horizontal gap={sizes._8sdp}>
              <LogoutIcon />
              <AppText fontFamily="content_semibold">Đăng xuất</AppText>
            </Box>
            <AppText textAlign="center" color={Colors.error}>
              {Platform.OS === 'ios'
                ? AppConfig.iosVersion
                : AppConfig.androidVersion}
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
