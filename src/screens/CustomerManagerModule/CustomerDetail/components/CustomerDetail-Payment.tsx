import { AppText, Box, CustomerCost, CustomerCostRef } from '@src/components';
import { sizes } from '@src/utils';
import React, { FC, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { PaymentItem } from './PaymentItem';
import { useAppTheme } from '@src/common';
import { customersDummy } from '@src/models';

interface Props {}
export const CustomerDetailPayment: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const customerCostRef = useRef<CustomerCostRef>(null);
  return (
    <Box style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          customerCostRef.current?.open(customersDummy[0].treatments)
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
          <AppText fontFamily="content_semibold">122.400.000 đ</AppText>
        </Box>
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">
            Tổng số tiền đã thanh toán
          </AppText>
          <AppText color={Colors.green}>122.400.000 đ</AppText>
        </Box>
        <Box horizontal justify="space-between">
          <AppText fontFamily="content_bold">Công nợ</AppText>
          <AppText color={Colors.red}>122.400.000 đ</AppText>
        </Box>
      </Box>
      <ScrollView
        contentContainerStyle={{ paddingBottom: sizes._48sdp }}
        showsVerticalScrollIndicator={false}
      >
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
        <PaymentItem />
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
