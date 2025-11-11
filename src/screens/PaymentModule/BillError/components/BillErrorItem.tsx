import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { BillErrorEntity } from '@src/models';
import { formatDateTime, formatMoney, sizes } from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  bill: BillErrorEntity;
}
export const BillErrorItem: FC<Props> = ({ bill }) => {
  const { Colors } = useAppTheme();
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
      <Box horizontal align="center" gap={sizes._6sdp}>
        <AppText
          fontFamily="content_bold"
          translationKey="bill_error_item_id"
        />
        <AppText>{bill.id}</AppText>
      </Box>
      <Box horizontal align="center" gap={sizes._6sdp}>
        <AppText
          fontFamily="content_bold"
          translationKey="bill_error_item_bank"
        />
        <AppText>{bill.gateway}</AppText>
      </Box>
      <Box horizontal align="center" gap={sizes._6sdp}>
        <AppText
          fontFamily="content_bold"
          translationKey="bill_error_item_transferAmount"
        />
        <AppText>{formatMoney(bill.transferAmount)} vnđ</AppText>
      </Box>
      <Box
        horizontal
        align="center"
        gap={sizes._6sdp}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flexWrap: 'wrap' }}
      >
        <AppText
          fontFamily="content_bold"
          translationKey="bill_error_item_content"
        />
        <AppText>{bill.content}</AppText>
      </Box>
      <Box horizontal align="center" gap={sizes._6sdp}>
        <AppText
          fontFamily="content_bold"
          translationKey="bill_error_item_create"
        />
        <AppText>
          {formatDateTime(bill.createdAt, 'dd/mm/yyyy HH:mm')} vnđ
        </AppText>
      </Box>
    </Box>
  );
};
const R = 12;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
