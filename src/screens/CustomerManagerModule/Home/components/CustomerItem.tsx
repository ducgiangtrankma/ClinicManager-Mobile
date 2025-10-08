import { CallIcon, CheckIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { CustomerEntity } from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import {
  _screen_width,
  ACTIVE_OPACITY_TOUCH,
  callNumber,
  sizes,
} from '@src/utils';

import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  item: CustomerEntity;
}

export const CustomerItem: FC<Props> = ({ item }) => {
  const { Colors, Images } = useAppTheme();

  return (
    <Box style={[styles.shadowWrap, { backgroundColor: Colors.white }]}>
      <TouchableOpacity
        activeOpacity={ACTIVE_OPACITY_TOUCH}
        onPress={() =>
          navigate(APP_SCREEN.CUSTOMER_DETAIL, {
            customerId: item.id,
          })
        }
      >
        <Box
          horizontal
          align="center"
          justify="space-between"
          gap={sizes._16sdp}
          style={[styles.card]}
        >
          <Image
            source={Images.blankAvatar}
            style={{
              width: sizes._32sdp,
              height: sizes._32sdp,
              borderRadius: sizes._990sdp,
            }}
          />
          <Box gap={sizes._12sdp} style={styles.infoContainer}>
            <AppText fontFamily="content_bold">{item.name}</AppText>
            <TouchableOpacity
              style={{ width: _screen_width * 0.3 }}
              activeOpacity={ACTIVE_OPACITY_TOUCH}
              onPress={() => callNumber(item.phoneNumber)}
            >
              <Box horizontal align="center" gap={sizes._6sdp}>
                <CallIcon />
                <AppText>{item.phoneNumber}</AppText>
              </Box>
            </TouchableOpacity>
          </Box>
          {item.completed && <CheckIcon color={Colors.green} />}
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
    marginVertical: sizes._6sdp,
  },
  card: {
    borderRadius: R,
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._16sdp,
  },
});
