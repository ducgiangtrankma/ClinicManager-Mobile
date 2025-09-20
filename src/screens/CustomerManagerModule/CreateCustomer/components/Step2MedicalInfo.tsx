import {
  AppInputMultipleLine,
  AppSelectForm,
  AppText,
  Box,
  SelectLeatherClassificationRef,
  SelectMaternityRef,
} from '@src/components';
import { CreateCustomerFormEntity } from '@src/models';
import { LEATHER_CLASSIFICATION_DATA, MATERNITY, sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  selectLeatherClassificationRef: React.RefObject<SelectLeatherClassificationRef>;
  selectMaternityRef: React.RefObject<SelectMaternityRef>;
}

export const Step2MedicalInfo: FC<Props> = ({
  formik,
  selectLeatherClassificationRef,
  selectMaternityRef,
}) => {
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;
  const leatherValue = LEATHER_CLASSIFICATION_DATA.find(
    e => e.value === values.type,
  );
  const maternityValue = MATERNITY.find(e => e.value === values.type);

  return (
    <Box gap={sizes._16sdp}>
      {/* Phân loại da */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_leather_classification"
          fontFamily="content_semibold"
        />
        <AppSelectForm
          onPress={() => selectLeatherClassificationRef.current?.open()}
          placeholder="customer_create_leather_classification_placeholder"
          errMessage={errors.leather_classification}
          value={leatherValue}
        />
      </Box>

      {/* Tình trạng thai sản */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_maternity"
          fontFamily="content_semibold"
        />
        <AppSelectForm
          onPress={() => selectMaternityRef.current?.open()}
          placeholder="customer_create_maternity_placeholder"
          errMessage={errors.maternity}
          value={maternityValue}
        />
      </Box>

      {/* Tiền sử bệnh */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_medical_history"
          fontFamily="content_semibold"
        />
        <AppInputMultipleLine
          value={values.medical_history}
          placeholder={t('customer_create_medical_history_placeholder')}
          onChangeText={value => setFieldValue('medical_history', value)}
          errMessage={errors.medical_history}
          clearButtonMode="always"
          multiline
        />
      </Box>
    </Box>
  );
};
