import {
  AppInput,
  AppSelectForm,
  Box,
  SelectCustomerTypeRef,
  FormTitle,
  AppText,
  SelectGenderRef,
} from '@src/components';
import { CreateCustomerFormEntity } from '@src/models';
import { CUSTOMER_TYPE_DATA, GENDER_DATA, sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  selectCustomerTypeRef: React.RefObject<SelectCustomerTypeRef>;
  selectGenderRef: React.RefObject<SelectGenderRef>;
}

export const Step1BasicInfo: FC<Props> = ({
  formik,
  selectCustomerTypeRef,
  selectGenderRef,
}) => {
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;
  const value = CUSTOMER_TYPE_DATA.find(e => e.value === values.type);
  const genderValue = GENDER_DATA.find(e => e.value === values.gender);

  return (
    <Box gap={sizes._16sdp}>
      {/* Tên khách hàng */}
      <Box gap={sizes._8sdp}>
        <FormTitle title="customer_create_name" required />
        <AppInput
          value={values.name}
          placeholder={t('customer_create_name_placeholder')}
          onChangeText={text => setFieldValue('name', text)}
          errMessage={errors.name}
          clearButtonMode="always"
        />
      </Box>

      {/* Số điện thoại */}
      <Box gap={sizes._8sdp}>
        <FormTitle title="customer_create_phoneNumber" required />
        <AppInput
          value={values.phoneNumber}
          placeholder={t('customer_create_phoneNumber_placeholder')}
          onChangeText={text => setFieldValue('phoneNumber', text)}
          errMessage={errors.phoneNumber}
          clearButtonMode="always"
        />
      </Box>

      {/* Giới tính */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_gender"
          fontFamily="content_semibold"
        />
        <AppSelectForm
          onPress={() => selectGenderRef.current?.open()}
          placeholder="customer_create_leather_classification_placeholder"
          errMessage={errors.gender}
          value={genderValue}
        />
      </Box>

      {/* Loại khách hàng */}
      <Box gap={sizes._8sdp}>
        <FormTitle title="customer_create_type" required />
        <AppSelectForm
          onPress={() => selectCustomerTypeRef.current?.open()}
          placeholder="customer_create_type_placeholder"
          errMessage={errors.type}
          value={value}
        />
      </Box>
    </Box>
  );
};
