/* eslint-disable react-native/no-inline-styles */
import { RouteProp, StackActions, useRoute } from '@react-navigation/native';
import { DownloadBillIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppHeader,
  AppRemoteImage,
  AppText,
  Box,
  globalLoading,
  PageContainer,
  showSuccessMessage,
} from '@src/components';
import { BillEntity } from '@src/models';
import {
  APP_SCREEN,
  goBack,
  navigationRef,
  RootStackParamList,
} from '@src/navigator';
import { PaymentService } from '@src/services';
import {
  _screen_width,
  DEFAULT_HIT_SLOP,
  formatDateTime,
  formatMoney,
  SaveToCameraRoll,
  sizes,
} from '@src/utils';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot';
interface Props {}
export const CreateBillScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.CREATE_BILL>>();
  const createBillPayload = route?.params?.bill;
  const { Colors } = useAppTheme();
  const viewShotRef = useRef<ViewShot>(null);
  const [bill, setBill] = useState<BillEntity>();
  const handleSaveBillToDevice = useCallback(() => {
    viewShotRef?.current?.capture?.().then(async uri => {
      await SaveToCameraRoll(uri);
      showSuccessMessage('action_success_message', 'save_bill_success_title');
    });
  }, []);

  const _handleCreateBill = useCallback(async () => {
    try {
      if (createBillPayload) {
        globalLoading.show();
        const response = await PaymentService.createBill(createBillPayload);
        setBill(response.data);
      }
    } catch (error: any) {
      console.log('error', error);
      showSuccessMessage('error.title', error.message);
      goBack();
    } finally {
      globalLoading.hide();
    }
  }, [createBillPayload]);
  console.log('bill', bill);

  useEffect(() => {
    _handleCreateBill();
  }, [_handleCreateBill]);

  return (
    <PageContainer disablePaddingBottom style={styles.container}>
      <AppHeader
        title="bill_header"
        showBack={true}
        customGoBackEvent={() => {
          navigationRef.current?.dispatch(StackActions.popToTop());
        }}
        rightContent={
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={handleSaveBillToDevice}
          >
            <DownloadBillIcon />
          </TouchableOpacity>
        }
      />
      {bill && (
        <ViewShot
          ref={viewShotRef}
          style={styles.container}
          captureMode="mount"
        >
          <ScrollView>
            <AppText
              textAlign="center"
              translationKey="payment_bill_description_1"
              margin={{ mb: sizes._16sdp, mt: sizes._16sdp }}
            />
            <AppRemoteImage
              uri={bill?.qrCode}
              thumbnailUri={bill?.qrCode}
              style={styles.qrCode}
            />
            <AppText textAlign="center">{bill.bill.id}</AppText>
            <Box horizontal align="center" style={{ alignSelf: 'center' }}>
              <AppText
                translationKey="payment_total"
                textAlign="center"
                fontFamily="content_bold"
              />
              <AppText
                fontSize="18"
                fontFamily="content_bold"
                color={Colors.red}
              >
                {' '}
                {formatMoney(bill.bill.paymentTotal)} vnđ
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
                  {bill?.treatmentInfo?.title ?? ''}
                </AppText>
              </Box>
              <Box horizontal>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_sum"
                />
                <AppText>
                  {' '}
                  {formatMoney(bill.treatmentInfo?.totalTreatmentFee ?? 0)} vnđ
                </AppText>
              </Box>
              <Box horizontal>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_paid"
                />
                <AppText> {formatMoney(bill?.bill.paymentTotal)} vnđ</AppText>
              </Box>
              <Box horizontal>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_in_debt"
                />
                <AppText>
                  {' '}
                  {formatMoney(
                    bill?.treatmentInfo?.estimatedDebtAfterPayment ?? 0,
                  )}{' '}
                  vnđ
                </AppText>
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
              {formatDateTime(bill.bill.createdAt, 'dd/mm/yyyy HH:mm')}
            </AppText>
          </ScrollView>
        </ViewShot>
      )}
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
