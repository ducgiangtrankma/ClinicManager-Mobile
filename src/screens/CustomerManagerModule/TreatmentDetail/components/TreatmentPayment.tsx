import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppInput,
  AppText,
  Box,
  FormTitle,
  showErrorMessage,
} from '@src/components';
import {
  BillType,
  CreateBillPayload,
  TreatmentDetailEntity,
  TreatmentPaymentFormValuesEntity,
} from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import {
  formatMoney,
  sizes,
  treatmentPaymentValidationSchema,
} from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

interface Props {
  treatment: TreatmentDetailEntity;
  onUpdateSuccess?: () => void;
}
export const TreatmentPayment: FC<Props> = ({ treatment }) => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

  const initialTreatmentPaymentValues: TreatmentPaymentFormValuesEntity = {
    totalTreatmentFee: treatment.totalTreatmentFee,
    paid: treatment.paid,
    debt: treatment.debt,
    newPaid: 0,
    voucher: null,
  };

  const handleExportBill = useCallback(
    (values: TreatmentPaymentFormValuesEntity) => {
      // Navigate to create bill screen with payment data
      const createBillPayload: CreateBillPayload = {
        customer: treatment.customer.id,
        type: BillType.TREATMENT,
        treatmentId: treatment.id,
        paid: Number(values.newPaid),
      };
      if (createBillPayload.paid === 0) {
        showErrorMessage(
          'error.title',
          'Không thể tạo hoá đơn chuyển khoản 0 vnđ',
        );
        return;
      }
      navigate(APP_SCREEN.CREATE_BILL, {
        bill: createBillPayload,
      });
    },
    [treatment.customer.id, treatment.id],
  );
  return (
    <Box style={styles.container}>
      <Formik
        initialValues={initialTreatmentPaymentValues}
        enableReinitialize
        validationSchema={treatmentPaymentValidationSchema(t)}
        onSubmit={handleExportBill}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <React.Fragment>
            <Box
              gap={sizes._8sdp}
              horizontal
              align="center"
              justify="space-between"
            >
              <FormTitle title="treatment_update_total_bill" required />
              <AppText
                color={Colors.content}
                fontFamily="content_bold"
                fontSize="18"
              >
                {formatMoney(treatment.totalTreatmentFee)}
              </AppText>
            </Box>
            <Box
              gap={sizes._8sdp}
              horizontal
              align="center"
              justify="space-between"
            >
              <FormTitle title="treatment_update_paid" required />
              <AppText
                color={Colors.content}
                fontFamily="content_bold"
                fontSize="18"
              >
                {formatMoney(treatment.paid)}
              </AppText>
            </Box>
            <Box
              gap={sizes._8sdp}
              horizontal
              align="center"
              justify="space-between"
            >
              <FormTitle title="treatment_update_debt" required />
              <AppText
                color={Colors.red}
                fontFamily="content_bold"
                fontSize="18"
              >
                {formatMoney(treatment.debt)}
              </AppText>
            </Box>
            <Box
              style={[
                styles.divider,
                {
                  backgroundColor: Colors.divider,
                },
              ]}
            />

            <Box gap={sizes._8sdp}>
              <FormTitle title="treatment_update_current_paid" required />
              <AppInput
                value={values.newPaid.toString()}
                onChangeText={value => setFieldValue('newPaid', Number(value))}
                clearButtonMode="always"
                keyboardType="number-pad"
                errMessage={errors.newPaid}
              />
              <AppText
                fontFamily="content_italic"
                fontSize="12"
                margin={{ ml: sizes._4sdp }}
              >
                Quy đổi tiền tệ: {formatMoney(values.newPaid)} vnđ
              </AppText>
            </Box>

            <Box
              horizontal
              gap={sizes._16sdp}
              style={[
                styles.actionContainer,
                {
                  backgroundColor: Colors.defaultPageBackground,
                  borderTopColor: Colors.divider,
                },
              ]}
            >
              <AppButton
                title="export_bill"
                onPress={handleSubmit}
                style={[styles.actionButton, { backgroundColor: Colors.error }]}
              />
            </Box>
          </React.Fragment>
        )}
      </Formik>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._24sdp,
    gap: sizes._16sdp,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
  },
  actionButton: {
    flex: 1,
    borderRadius: sizes._12sdp,
  },
  createPayment: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: sizes._1sdp,
  },
});
