import {
  AppText,
  Box,
  CustomerCost,
  CustomerCostRef,
  showErrorMessage,
} from '@src/components';
import { formatMoney, sizes } from '@src/utils';
import React, { FC, useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useAppTheme } from '@src/common';
import { CustomerDetailEntity, PaymentHistory } from '@src/models';
import { PaymentService } from '@src/services';
import { PaymentItem } from './PaymentItem';
import { APP_SCREEN, navigate } from '@src/navigator';

interface Props {
  customerInfo: CustomerDetailEntity;
}
export const CustomerDetailPayment: FC<Props> = ({ customerInfo }) => {
  const { Colors } = useAppTheme();
  const customerCostRef = useRef<CustomerCostRef>(null);
  const [payments, setPayments] = useState<PaymentHistory[]>([]);

  const getPaymentHistory = useCallback(async () => {
    try {
      const response = await PaymentService.getPaymentHistory(customerInfo.id);
      setPayments(response.data);
    } catch (error: any) {
      console.log('error', error);
      showErrorMessage('error.title', error.message);
    }
  }, [customerInfo.id]);

  useFocusEffect(
    React.useCallback(() => {
      getPaymentHistory();
      return () => {};
    }, [getPaymentHistory]),
  );

  console.log('payments', payments);
  return (
    <Box style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigate(APP_SCREEN.CUSTOMER_COST, {
            customerId: customerInfo.id,
          })
        }
      >
        <AppText
          translationKey="customer_detail_cost"
          textAlign="right"
          fontSize="18"
          color={Colors.red}
          margin={{ mt: sizes._16sdp, mb: sizes._16sdp }}
          style={styles.cost}
        />
      </TouchableOpacity>
      <Box
        gap={sizes._16sdp}
        style={{
          borderBottomWidth: sizes._1sdp,
          borderBottomColor: Colors.divider,
          paddingBottom: sizes._16sdp,
          marginBottom: sizes._16sdp,
        }}
      >
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">Tổng chi phí điều trị: </AppText>
          <AppText fontFamily="content_semibold">
            {formatMoney(customerInfo.totalTreatmentFee)} đ
          </AppText>
        </Box>
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">
            Tổng số tiền đã thanh toán
          </AppText>
          <AppText color={Colors.green}>
            {' '}
            {formatMoney(customerInfo.paid)} đ
          </AppText>
        </Box>
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">Công nợ</AppText>
          <AppText color={Colors.red}>
            {' '}
            {formatMoney(customerInfo.debt)} đ
          </AppText>
        </Box>
      </Box>
      <ScrollView
        contentContainerStyle={{ paddingBottom: sizes._48sdp }}
        showsVerticalScrollIndicator={false}
      >
        {payments.map(item => (
          <PaymentItem key={item.id} item={item} />
        ))}
      </ScrollView>
      <CustomerCost ref={customerCostRef} />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._16sdp,
  },
  cost: {
    textDecorationLine: 'underline',
  },
});
