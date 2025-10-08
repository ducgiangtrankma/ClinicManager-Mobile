import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppInput,
  AppSelectForm,
  AppText,
  Box,
  FormTitle,
  globalLoading,
  SelectCustomerType,
  SelectCustomerTypeRef,
  SelectGender,
  SelectGenderRef,
  showErrorMessage,
} from '@src/components';
import {
  CreateCustomerFormEntity,
  CustomerDetailEntity,
  Gender,
} from '@src/models';
import { CustomerService } from '@src/services';
import {
  CUSTOMER_TYPE_DATA,
  GENDER_DATA,
  renderGender,
  sizes,
} from '@src/utils';
import { Formik, FormikProps } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {
  customerInfo: CustomerDetailEntity;
  onUpdateSuccess: () => void;
}

export const CustomerDetailInfo: FC<Props> = ({
  customerInfo,
  onUpdateSuccess,
}) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectCustomerTypeRef = useRef<SelectCustomerTypeRef>(null);
  const selectGenderRef = useRef<SelectGenderRef>(null);

  const formikRef = useRef<FormikProps<CreateCustomerFormEntity>>(null);

  // Lazy initialization - chỉ tạo khi cần edit
  const getInitialValues = (): CreateCustomerFormEntity => ({
    name: customerInfo.name,
    gender: customerInfo.gender,
    type: customerInfo.type,
    phoneNumber: customerInfo.phoneNumber,
    stepTreatment: customerInfo.stepTreatment,
    images: customerInfo.images,
    leatherClassification: customerInfo.leatherClassification,
    maternity: customerInfo.maternity,
    medicalHistory: customerInfo.medicalHistory,
    preTreatment: customerInfo.preTreatment,
    otherInfo: customerInfo.otherInfo,
    skinCondition: customerInfo.skinCondition,
    routine: customerInfo.routine,
    diagnostic: customerInfo.diagnostic,
    note: customerInfo.note,
  });

  const handleSave = async (values: CreateCustomerFormEntity) => {
    // Combine form values with images
    try {
      globalLoading.show();

      const createCustomerPayload = {
        ...values,
        images: values.images.map(e => e.id), // Array of string IDs
      };
      console.log('Saving medical info:', createCustomerPayload);
      await CustomerService.updateCustomer(
        customerInfo.id,
        createCustomerPayload,
      );
      onUpdateSuccess();
    } catch (error: any) {
      console.log('error', error);
      showErrorMessage('error.title', error.message);
      throw error;
    } finally {
      globalLoading.hide();
    }

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

  // Render View Mode - Không dùng Formik
  const renderViewMode = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Box gap={sizes._16sdp}>
        {/* Tên khách hàng */}
        {renderField('customer_create_name', customerInfo.name, true)}

        {/* Số điện thoại */}
        {renderField(
          'customer_create_phoneNumber',
          customerInfo.phoneNumber,
          true,
        )}

        {/* Giới tính */}
        <Box gap={sizes._8sdp}>
          <FormTitle title="customer_create_gender" />
          <AppText color={Colors.content} fontFamily="content_regular">
            {renderGender(customerInfo.gender as Gender)}
          </AppText>
        </Box>

        {/* Loại khách hàng */}
        <Box gap={sizes._8sdp}>
          <FormTitle title="customer_create_type" required />
          <AppText color={Colors.content} fontFamily="content_regular">
            {CUSTOMER_TYPE_DATA.find(e => e.value === customerInfo.type)
              ?.label || t('empty_value')}
          </AppText>
        </Box>
      </Box>
    </ScrollView>
  );

  // Render Edit Mode - Có Formik
  const renderEditMode = () => (
    <Formik
      innerRef={formikRef}
      initialValues={getInitialValues()}
      onSubmit={handleSave}
    >
      {formikProps => (
        <>
          {console.log(
            'formikProps',
            CUSTOMER_TYPE_DATA.find(e => e.value === formikProps.values.type),
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Box gap={sizes._16sdp}>
              {/* Tên khách hàng */}
              {renderEditableField(
                formikProps,
                'name',
                'customer_create_name',
                'customer_create_name_placeholder',
                true,
              )}

              {/* Số điện thoại */}
              {renderEditableField(
                formikProps,
                'phoneNumber',
                'customer_create_phoneNumber',
                'customer_create_phoneNumber_placeholder',
                true,
              )}

              {/* Giới tính */}
              <Box gap={sizes._8sdp}>
                <AppText
                  translationKey="customer_create_gender"
                  fontFamily="content_semibold"
                />
                <AppSelectForm
                  onPress={() => selectGenderRef.current?.open()}
                  placeholder="select_gender_title"
                  errMessage={formikProps.errors.gender}
                  value={GENDER_DATA.find(
                    e => e.value === formikProps.values.gender,
                  )}
                />
              </Box>

              {/* Loại khách hàng */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="customer_create_type" required />
                <AppSelectForm
                  onPress={() => selectCustomerTypeRef.current?.open()}
                  placeholder="customer_create_type_placeholder"
                  errMessage={formikProps.errors.type}
                  value={CUSTOMER_TYPE_DATA.find(
                    e => e.value === formikProps.values.type,
                  )}
                />
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
          </Box>

          {/* Select Customer Type Modal */}
          <SelectCustomerType
            ref={selectCustomerTypeRef}
            onSelect={value => {
              formikProps.setFieldValue('type', value.value);
            }}
            valueSelect={
              formikRef.current?.values?.type || CUSTOMER_TYPE_DATA[0].value
            }
          />
          <SelectGender
            ref={selectGenderRef}
            onSelect={value => {
              formikProps.setFieldValue('gender', value.value);
              selectGenderRef.current?.close();
            }}
            valueSelect={
              formikRef.current?.values?.gender || GENDER_DATA[1].value
            }
          />
        </>
      )}
    </Formik>
  );

  return (
    <Box style={styles.container}>
      {isEditing ? renderEditMode() : renderViewMode()}

      {/* Edit Button - chỉ hiện trong view mode */}
      {!isEditing && (
        <Box
          style={[
            styles.actionContainer,
            {
              backgroundColor: Colors.defaultPageBackground,
              borderTopColor: Colors.divider,
            },
          ]}
        >
          <AppButton
            title="step_button_edit"
            onPress={() => setIsEditing(true)}
            style={styles.actionButton}
          />
        </Box>
      )}
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
