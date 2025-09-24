import { useAppTheme } from '@src/common';
import { AppButton, AppInput, Box, FormTitle } from '@src/components';
import { TreatmentEntity, TreatmentPaymentFormValuesEntity } from '@src/models';
import { APP_SCREEN, navigate } from '@src/navigator';
import {
  formatMoney,
  sizes,
  treatmentPaymentValidationSchema,
} from '@src/utils';
import { Formik } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

interface Props {
  treatment: TreatmentEntity;
}
export const TreatmentPayment: FC<Props> = ({ treatment }) => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();
  const initialTreatmentPaymentValues: TreatmentPaymentFormValuesEntity = {
    total_treatment_fee: treatment.total_treatment_fee,
    paid: treatment.paid,
    debt: treatment.debt,
    newPaid: 0,
  };
  return (
    <Box style={styles.container}>
      <Formik
        initialValues={initialTreatmentPaymentValues}
        enableReinitialize
        validationSchema={treatmentPaymentValidationSchema(t)}
        onSubmit={values => {
          console.log('values', values);
          navigate(APP_SCREEN.CREATE_BILL);
        }}
      >
        {({ handleSubmit, errors, values, setFieldValue }) => (
          <React.Fragment>
            <Box gap={sizes._8sdp}>
              <FormTitle title="treatment_update_total_bill" required />
              <AppInput
                value={formatMoney(treatment.total_treatment_fee).toString()}
                onChangeText={() => {}}
                clearButtonMode="always"
                errMessage={errors.total_treatment_fee}
              />
            </Box>
            <Box gap={sizes._8sdp}>
              <FormTitle title="treatment_update_paid" required />
              <AppInput
                value={formatMoney(treatment.paid).toString()}
                onChangeText={() => {}}
                clearButtonMode="always"
                errMessage={errors.paid}
              />
            </Box>

            <Box gap={sizes._8sdp}>
              <FormTitle title="treatment_update_current_paid" required />
              <AppInput
                value={formatMoney(values.newPaid).toString()}
                onChangeText={value => setFieldValue('newPaid', Number(value))}
                clearButtonMode="always"
                keyboardType="number-pad"
                errMessage={errors.newPaid}
              />
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
                title="step_button_title_back"
                onPress={() => {}}
                style={[
                  styles.actionButton,
                  { backgroundColor: Colors.disableButtonBackground },
                ]}
                titleColor={Colors.black}
              />
              <AppButton
                title="export_bill"
                onPress={handleSubmit}
                style={styles.actionButton}
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
});
