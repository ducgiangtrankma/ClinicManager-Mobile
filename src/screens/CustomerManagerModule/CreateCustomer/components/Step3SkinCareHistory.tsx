import { AppInputMultipleLine, AppText, Box } from '@src/components';
import { CreateCustomerFormEntity } from '@src/models';
import { sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
}

export const Step3SkinCareHistory: FC<Props> = ({ formik }) => {
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;

  return (
    <Box gap={sizes._16sdp}>
      {/* Điều trị trước đó */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_pre_treatment"
          fontFamily="content_semibold"
        />
        <AppInputMultipleLine
          value={values.preTreatment}
          placeholder={t('customer_create_pre_treatment_placeholder')}
          onChangeText={value => setFieldValue('pre_treatment', value)}
          errMessage={errors.preTreatment}
          clearButtonMode="always"
          multiline
        />
      </Box>

      {/* Tình trạng da hiện tại */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_skin_condition"
          fontFamily="content_semibold"
        />
        <AppInputMultipleLine
          value={values.skinCondition}
          placeholder={t('customer_create_skin_condition_placeholder')}
          onChangeText={value => setFieldValue('skin_condition', value)}
          errMessage={errors.skinCondition}
          clearButtonMode="always"
          multiline
        />
      </Box>

      {/* Quy trình chăm sóc */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_routine"
          fontFamily="content_semibold"
        />
        <AppInputMultipleLine
          value={values.routine}
          placeholder={t('customer_create_routine_placeholder')}
          onChangeText={value => setFieldValue('routine', value)}
          errMessage={errors.routine}
          clearButtonMode="always"
          multiline
        />
      </Box>
    </Box>
  );
};
