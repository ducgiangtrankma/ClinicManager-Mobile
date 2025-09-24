import { CallIcon, CheckIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AppText, Avatar, Box } from '@src/components';
import { CustomerEntity } from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import {
  ACTIVE_OPACITY_TOUCH,
  callNumber,
  isSuccessTreatment,
  sizes,
} from '@src/utils';

import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  item: CustomerEntity;
}

export const CustomerItem: FC<Props> = ({ item }) => {
  const { Colors } = useAppTheme();

  return (
    <Box style={styles.shadowWrap}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY_TOUCH}
        onPress={() => navigate(APP_SCREEN.CUSTOMER_DETAIL)}
      >
        <Box
          horizontal
          align="center"
          justify="space-between"
          gap={sizes._16sdp}
          style={[styles.card, { backgroundColor: Colors.white }]}
        >
          <Avatar size={sizes._32sdp} uri={item.profile.avatar.iconUrl} />
          <Box gap={sizes._12sdp} style={styles.infoContainer}>
            <AppText fontFamily="content_bold">{item.profile.name}</AppText>
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY_TOUCH}
              onPress={() => callNumber(item.phoneNumber)}
            >
              <Box horizontal align="center" gap={sizes._6sdp}>
                <CallIcon />
                <AppText>{item.phoneNumber}</AppText>
              </Box>
            </TouchableOpacity>
          </Box>
          {isSuccessTreatment(item.treatments) && (
            <CheckIcon color={Colors.green} />
          )}
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

const R = 12;

const styles = StyleSheet.create({
  infoContainer: { flex: 1 },
  shadowWrap: {
    width: '100%',
    borderRadius: R,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: sizes._2sdp },
    shadowOpacity: 0.08,
    shadowRadius: sizes._2sdp,
    // Android shadow
    elevation: sizes._6sdp,
    // khoảng cách giữa các item
    marginVertical: sizes._6sdp,
  },
  card: {
    borderRadius: R,
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._16sdp,
    // nếu muốn che nội dung tràn góc bo:
    overflow: 'hidden', // (để ở card, KHÔNG để ở shadowWrap)
  },
});
