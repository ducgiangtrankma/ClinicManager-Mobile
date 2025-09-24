import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {}
export const PaymentItem: FC<Props> = () => {
  const { Colors } = useAppTheme();

  return (
    <Box style={styles.container}>
      <Box style={[styles.card, { backgroundColor: Colors.white }]}>
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">Buổi 1</AppText>
          <AppText fontSize="14">18:12 21/02/2025</AppText>
        </Box>
        <Box horizontal justify="space-between">
          <Box>
            <AppText fontFamily="content_semibold">Tổng hoá đơn</AppText>
            <AppText>200.000.000₫ </AppText>
          </Box>
          <Box>
            <AppText fontFamily="content_semibold">Đã thanh toán</AppText>
            <AppText>200.000.000₫ </AppText>
          </Box>
          <Box>
            <AppText fontFamily="content_semibold">Công nợ</AppText>
            <AppText>200.000.000₫ </AppText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
const R = 12;
const styles = StyleSheet.create({
  container: {
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
    gap: sizes._8sdp,
    // nếu muốn che nội dung tràn góc bo:
    overflow: 'hidden', // (để ở card, KHÔNG để ở shadowWrap)
  },
});
