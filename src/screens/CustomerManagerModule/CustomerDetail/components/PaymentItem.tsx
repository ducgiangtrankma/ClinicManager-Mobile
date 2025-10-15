import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { BillStatus, PaymentHistory } from '@src/models';
import { formatDateTime, formatMoney, sizes } from '@src/utils';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  item: PaymentHistory;
}
export const PaymentItem: FC<Props> = ({ item }) => {
  const { Colors } = useAppTheme();
  const renderPaymentStatus = useCallback(
    (status: BillStatus) => {
      if (status === BillStatus.SUCCESS)
        return <AppText color={Colors.green}>Thành công</AppText>;
      if (status === BillStatus.WAIT_FOR_PAYMENT)
        return <AppText color={Colors.error}>Chờ chuyển khoản</AppText>;
      if (status === BillStatus.ERROR)
        return <AppText color={Colors.red}>Lỗi thanh toán</AppText>;
      if (status === BillStatus.PENDING)
        return <AppText color={Colors.blackGray}>Chờ thanh toán</AppText>;

      return <></>;
    },
    [Colors.blackGray, Colors.error, Colors.green, Colors.red],
  );
  return (
    <Box style={[styles.container, { backgroundColor: Colors.white }]}>
      <Box style={[styles.card]}>
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">
            {item.treatment?.title ?? 'Thanh toán toàn bộ'}
          </AppText>
          <AppText fontSize="14">
            {formatDateTime(item.createdAt, 'dd/mm/yyyy HH:mm')}
          </AppText>
        </Box>
        <Box horizontal justify="space-between">
          <Box>
            <AppText fontFamily="content_semibold">Số tiền thanh toán</AppText>
            <AppText>{formatMoney(item.paymentTotal)}₫ </AppText>
          </Box>
          <Box align="flex-end">
            <AppText fontFamily="content_semibold">Trạng thái</AppText>
            {renderPaymentStatus(item.status)}
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
    elevation: sizes._4sdp,
    // khoảng cách giữa các item
    marginVertical: sizes._6sdp,
  },
  card: {
    borderRadius: R,
    paddingVertical: sizes._12sdp,
    paddingHorizontal: sizes._16sdp,
    gap: sizes._8sdp,
  },
});
