import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppInput,
  AppSelectForm,
  AppText,
  Box,
  SelectCustomerType,
  SelectCustomerTypeRef,
  FormTitle,
} from '@src/components';
import {
  CreateCustomerFormEntity,
  CUSTOMER_TYPE,
  customersDummy,
  Sex,
} from '@src/models';
import { CUSTOMER_TYPE_DATA, sizes } from '@src/utils';
import { Formik, FormikProps } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {}

export const CustomerDetailInfo: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectCustomerTypeRef = useRef<SelectCustomerTypeRef>(null);
  const formikRef = useRef<FormikProps<CreateCustomerFormEntity>>(null);

  // Mock data - lấy khách hàng đầu tiên để demo
  const customerData = customersDummy[0];

  const initialValues: CreateCustomerFormEntity = {
    name: customerData.profile.name,
    gender: customerData.gender as Sex,
    type: customerData.type as CUSTOMER_TYPE,
    phoneNumber: customerData.phoneNumber,
    stepTreatment: [],
    images: [],
    leather_classification: customerData.leather_classification,
    maternity: '',
    medical_history: customerData.medical_history,
    pre_treatment: customerData.pre_treatment,
    other_info: customerData.other_info,
    skin_condition: customerData.skin_condition,
    routine: '',
    diagnostic: customerData.diagnostic,
    note: '',
  };

  const handleSave = (values: CreateCustomerFormEntity) => {
    console.log('Saving customer info:', values);
    // TODO: Call API to update customer info
    setIsEditing(false);
  };

  const handleCancel = () => {
    formikRef.current?.resetForm();
    setIsEditing(false);
  };

  const renderField = (
    label: string,
    value: string,
    isRequired: boolean = false,
  ) => (
    <Box gap={sizes._8sdp}>
      <FormTitle title={label as any} required={isRequired} />
      <AppText color={Colors.content} fontFamily="content_regular">
        {value || t('empty_value')}
      </AppText>
    </Box>
  );

  const renderEditableField = (
    formik: FormikProps<CreateCustomerFormEntity>,
    fieldName: keyof CreateCustomerFormEntity,
    label: string,
    placeholder: string,
    isRequired: boolean = false,
  ) => (
    <Box gap={sizes._8sdp}>
      <FormTitle title={label as any} required={isRequired} />
      <AppInput
        value={formik.values[fieldName] as string}
        placeholder={t(placeholder)}
        onChangeText={value => formik.setFieldValue(fieldName, value)}
        errMessage={formik.errors[fieldName] as string}
        clearButtonMode="always"
      />
    </Box>
  );

  return (
    <Box style={styles.container}>
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSave}
      >
        {formikProps => (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <Box gap={sizes._16sdp}>
                {/* Tên khách hàng */}
                {isEditing
                  ? renderEditableField(
                      formikProps,
                      'name',
                      'customer_create_name',
                      'customer_create_name_placeholder',
                      true,
                    )
                  : renderField(
                      'customer_create_name',
                      formikProps.values.name,
                      true,
                    )}

                {/* Số điện thoại */}
                {isEditing
                  ? renderEditableField(
                      formikProps,
                      'phoneNumber',
                      'customer_create_phoneNumber',
                      'customer_create_phoneNumber_placeholder',
                      true,
                    )
                  : renderField(
                      'customer_create_phoneNumber',
                      formikProps.values.phoneNumber,
                      true,
                    )}

                {/* Loại khách hàng */}
                <Box gap={sizes._8sdp}>
                  <FormTitle title="customer_create_type" required />
                  {isEditing ? (
                    <AppSelectForm
                      onPress={() => selectCustomerTypeRef.current?.open()}
                      placeholder="customer_create_type_placeholder"
                      errMessage={formikProps.errors.type}
                      value={CUSTOMER_TYPE_DATA.find(
                        e => e.value === formikProps.values.type,
                      )}
                    />
                  ) : (
                    <AppText
                      color={Colors.content}
                      fontFamily="content_regular"
                    >
                      {CUSTOMER_TYPE_DATA.find(
                        e => e.value === formikProps.values.type,
                      )?.label || t('empty_value')}
                    </AppText>
                  )}
                </Box>

                {/* Giới tính */}
                <Box gap={sizes._8sdp}>
                  <FormTitle title="customer_create_type" />
                  <AppText color={Colors.content} fontFamily="content_regular">
                    {formikProps.values.gender === Sex.NAM
                      ? t('male')
                      : t('female')}
                  </AppText>
                </Box>
              </Box>
            </ScrollView>

            {/* Action Buttons */}
            <Box
              style={[
                styles.actionContainer,
                {
                  backgroundColor: Colors.defaultPageBackground,
                  borderTopColor: Colors.divider,
                },
              ]}
            >
              {isEditing ? (
                <Box horizontal gap={sizes._12sdp}>
                  <AppButton
                    title="step_button_title_back"
                    onPress={handleCancel}
                    style={[
                      styles.actionButton,
                      { backgroundColor: Colors.disableButtonBackground },
                    ]}
                    titleColor={Colors.black}
                  />
                  <AppButton
                    title="step_button_save"
                    onPress={formikProps.handleSubmit}
                    style={styles.actionButton}
                  />
                </Box>
              ) : (
                <AppButton
                  title="step_button_edit"
                  onPress={() => setIsEditing(true)}
                  style={styles.actionButton}
                />
              )}
            </Box>

            {/* Select Customer Type Modal */}
            <SelectCustomerType
              ref={selectCustomerTypeRef}
              onSelect={value => {
                formikProps.setFieldValue('type', value.value);
              }}
            />
          </>
        )}
      </Formik>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: sizes._16sdp,
    paddingBottom: sizes._80sdp,
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
