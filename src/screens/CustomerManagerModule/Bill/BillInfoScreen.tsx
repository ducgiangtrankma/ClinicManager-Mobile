/* eslint-disable react-native/no-inline-styles */
import { DownloadBillIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppHeader,
  AppRemoteImage,
  AppText,
  Box,
  PageContainer,
} from '@src/components';
import {
  _screen_width,
  DEFAULT_HIT_SLOP,
  formatMoney,
  sizes,
} from '@src/utils';
import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface Props {}
export const CreateBillScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  return (
    <PageContainer disablePaddingBottom style={styles.container}>
      <AppHeader
        title="bill_header"
        showBack={true}
        rightContent={
          <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP}>
            <DownloadBillIcon />
          </TouchableOpacity>
        }
      />
      <AppText
        textAlign="center"
        translationKey="payment_bill_description_1"
        margin={{ mb: sizes._16sdp }}
      />
      <AppRemoteImage
        uri="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/solutions/epc/QRCode.png"
        thumbnailUri="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/solutions/epc/QRCode.png"
        style={styles.qrCode}
      />
      <AppText textAlign="center">DESI6186</AppText>
      <Box horizontal align="center" style={{ alignSelf: 'center' }}>
        <AppText
          translationKey="payment_total"
          textAlign="center"
          fontFamily="content_bold"
        />
        <AppText fontSize="18" fontFamily="content_bold" color={Colors.red}>
          {' '}
          {formatMoney(20000)} vnđ
        </AppText>
      </Box>
      <AppText
        translationKey="payment_bill_description_2"
        fontFamily="content_italic"
        textAlign="center"
        margin={{ mt: sizes._16sdp, ml: sizes._36sdp, mr: sizes._36sdp }}
        color={Colors.red}
      />
      <AppText
        translationKey="payment_bill_description_3"
        fontFamily="content_italic"
        textAlign="center"
        margin={{ ml: sizes._36sdp, mr: sizes._36sdp }}
        color={Colors.red}
      />
      <Box
        style={[
          styles.billInfo,
          {
            borderColor: Colors.green,
          },
        ]}
      >
        <AppText
          translationKey="payment_bill_info"
          fontSize="18"
          fontFamily="content_bold"
        />
        <Box horizontal style={{ flexWrap: 'wrap' }}>
          <AppText
            fontFamily="content_bold"
            translationKey="payment_bill_info_treatment"
          />
          <AppText numberOfLines={2}>
            Liệu trình chăm sóc da buổi 1 đá ádasd ád á dá đá sa
          </AppText>
        </Box>
        <Box horizontal>
          <AppText
            fontFamily="content_bold"
            translationKey="payment_bill_sum"
          />
          <AppText> {formatMoney(20000)} vnđ</AppText>
        </Box>
        <Box horizontal>
          <AppText
            fontFamily="content_bold"
            translationKey="payment_bill_paid"
          />
          <AppText> {formatMoney(10000)} vnđ</AppText>
        </Box>
        <Box horizontal>
          <AppText
            fontFamily="content_bold"
            translationKey="payment_bill_in_debt"
          />
          <AppText> {formatMoney(10000)} vnđ</AppText>
        </Box>
      </Box>
      <AppText textAlign="center" fontFamily="content_italic">
        Desi Beauty
      </AppText>
      <AppText
        textAlign="center"
        fontFamily="content_italic"
        color={Colors.blackGray}
        margin={{ mt: sizes._8sdp }}
      >
        08:15 - 26/09/2025
      </AppText>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  qrCode: {
    width: _screen_width * 0.6,
    height: 'auto',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  billInfo: {
    marginTop: sizes._28sdp,
    gap: sizes._8sdp,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 20,
    borderRadius: 10,
    margin: sizes._24sdp,
  },
});
