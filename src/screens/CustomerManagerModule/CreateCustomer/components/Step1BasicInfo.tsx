import {
  AppInput,
  AppSelectForm,
  Box,
  SelectCustomerTypeRef,
} from '@src/components';
import { CreateCustomerFormEntity } from '@src/models';
import { CUSTOMER_TYPE_DATA, sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FormTitle } from './FormTitle';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  selectCustomerTypeRef: React.RefObject<SelectCustomerTypeRef>;
}

export const Step1BasicInfo: FC<Props> = ({
  formik,
  selectCustomerTypeRef,
}) => {
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;
  const value = CUSTOMER_TYPE_DATA.find(e => e.value === values.type);
  return (
    <Box gap={sizes._16sdp}>
      {/* Tên khách hàng */}
      <Box gap={sizes._8sdp}>
        <FormTitle title="customer_create_name" required />
        <AppInput
          value={values.name}
          placeholder={t('customer_create_name_placeholder')}
          onChangeText={value => setFieldValue('name', value)}
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
          onChangeText={value => setFieldValue('phoneNumber', value)}
          errMessage={errors.phoneNumber}
          clearButtonMode="always"
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
