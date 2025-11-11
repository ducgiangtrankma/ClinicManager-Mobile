import { SyncIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import { AppText, Box, showErrorMessage } from '@src/components';
import { BillExportEntity, BillStatus } from '@src/models';
import { PaymentService } from '@src/services';
import {
  ACTIVE_OPACITY_TOUCH,
  formatDateTime,
  formatMoney,
  sizes,
} from '@src/utils';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
interface Props {
  bill: BillExportEntity;
}
export const BillExportItem: FC<Props> = ({ bill }) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
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
  const handleManualSync = useCallback(async () => {
    try {
      await PaymentService.manualSyncSuccessBill(bill.id);
    } catch (error) {
      console.log('error', error);
      showErrorMessage('error.title', 'active_error_message');
    }
  }, [bill.id]);

  const handleConfirmSync = useCallback(() => {
    Alert.alert(
      t('sync_bill_success_title'),
      t('sync_bill_success_description'),
      [
        {
          text: t('delete_rollback'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // On iOS, this makes the button appear as a cancel button
        },
        {
          text: t('confirm'),
          onPress: () => handleManualSync(),
        },
      ],
    );
  }, [handleManualSync, t]);
  return (
    <Box
      style={[
        styles.itemContainer,
        styles.shadowWrap,
        {
          backgroundColor: Colors.white,
        },
      ]}
    >
      <Box
        horizontal
        align="center"
        gap={sizes._6sdp}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flexWrap: 'wrap' }}
      >
        <AppText fontFamily="content_bold">Từ:</AppText>
        <AppText>{bill.customer.name}</AppText>
      </Box>
      <Box horizontal align="center" gap={sizes._6sdp} justify="space-between">
        <Box horizontal align="center" gap={sizes._6sdp}>
          <AppText
            fontFamily="content_bold"
            translationKey="bill_export_item_id"
          />
          <AppText>{bill.id}</AppText>
        </Box>
        {bill.status !== BillStatus.SUCCESS && (
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            style={styles.copyButton}
            onPress={handleConfirmSync}
          >
            <SyncIcon color={Colors.green} />
            <AppText
              fontFamily="content_italic"
              color={Colors.green}
              translationKey="bill_export_item_sync"
            />
          </TouchableOpacity>
        )}
      </Box>
      <Box horizontal align="center" gap={sizes._6sdp}>
        <AppText
          fontFamily="content_bold"
          translationKey="bill_export_item_paymentTotal"
        />
        <AppText>{formatMoney(bill.paymentTotal)} vnđ</AppText>
      </Box>
      <Box horizontal align="center" gap={sizes._6sdp}>
        <AppText
          fontFamily="content_bold"
          translationKey="bill_export_item_status"
        />
        {renderPaymentStatus(bill.status)}
      </Box>
      <AppText
        fontFamily="content_italic"
        color={Colors.content}
        translationKey="bill_export_item_update"
      >
        {formatDateTime(bill.updatedAt, 'dd/mm/yyyy HH:mm')}
      </AppText>
    </Box>
  );
};
const R = 12;
const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: sizes._24sdp,
    gap: sizes._6sdp,
    paddingVertical: sizes._16sdp,
  },
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
  copyButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
