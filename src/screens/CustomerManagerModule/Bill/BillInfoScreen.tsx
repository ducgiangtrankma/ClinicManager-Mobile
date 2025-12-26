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
import { BillEntity, BillType } from '@src/models';
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
  const customerName = route?.params?.customerName;

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
        console.log('createBillPayload', createBillPayload);
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

  const valueQrCode = (bill && bill.bill.paymentTotal) ?? 0;
  // const sumTotal =
  //   bill && bill.treatmentInfo
  //     ? bill.treatmentInfo.totalTreatmentFee
  //     : bill?.bill.total ?? 0;
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ViewShot
            ref={viewShotRef}
            style={[{ backgroundColor: Colors.white }]}
            options={{ format: 'jpg', quality: 0.9 }}
          >
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
                {formatMoney(valueQrCode)} vnđ
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
              <Box
                direction="horizontal"
                style={{
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: sizes._4sdp,
                }}
              >
                <AppText
                  translationKey="payment_bill_info"
                  fontSize="18"
                  fontFamily="content_bold"
                />
                <AppText>{customerName ?? ''}</AppText>
              </Box>
              <Box>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_info_treatment"
                />
                {bill.treatmentInfo?.map(t => (
                  <Box
                    key={t.description}
                    style={{
                      borderBottomWidth: 1,
                      borderStyle: 'dashed',
                      paddingBottom: sizes._8sdp,
                      marginHorizontal: sizes._8sdp,
                    }}
                  >
                    <Box
                      horizontal
                      style={{
                        flexWrap: 'wrap',
                        marginTop: sizes._8sdp,
                        marginBottom: sizes._6sdp,
                      }}
                      align="center"
                    >
                      <AppText
                        numberOfLines={2}
                        fontFamily="content_italic"
                        fontSize="14"
                      >
                        Liệu trình:
                      </AppText>
                      <AppText fontFamily="content_italic" fontSize="14">
                        {t.title ?? ''}
                      </AppText>
                    </Box>
                    <AppText
                      numberOfLines={2}
                      fontFamily="content_italic"
                      fontSize="14"
                    >
                      Chi tiết:
                    </AppText>
                    <Box style={{ flexWrap: 'wrap' }} align="center">
                      <AppText fontFamily="content_italic" fontSize="14">
                        {t.description ?? ''}
                      </AppText>
                    </Box>
                  </Box>
                ))}
              </Box>
              {/* <Box horizontal>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_sum"
                />
                <AppText> {formatMoney(sumTotal)} vnđ</AppText>
              </Box> */}
              <Box horizontal>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_paid"
                />
                <AppText> {formatMoney(valueQrCode)} vnđ</AppText>
              </Box>
              <Box horizontal>
                <AppText
                  fontFamily="content_bold"
                  translationKey="payment_bill_in_debt"
                />
                {bill.type === BillType.ALL ? (
                  <AppText> 0 vnđ</AppText>
                ) : (
                  <AppText>
                    {' '}
                    {formatMoney(
                      bill?.treatmentInfo[0].estimatedDebtAfterPayment ?? 0,
                    )}{' '}
                    vnđ
                  </AppText>
                )}
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
          </ViewShot>
        </ScrollView>
      )}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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
