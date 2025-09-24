// Thông tin khám ban đầu
import { SelectImageIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppInputMultipleLine,
  AppSelectForm,
  AppText,
  AttachmentPicker,
  AttachmentPickerRef,
  Box,
  GridImage,
  SelectLeatherClassification,
  SelectLeatherClassificationRef,
  SelectMaternity,
  SelectMaternityRef,
  FormTitle,
} from '@src/components';
import {
  CreateCustomerFormEntity,
  customersDummy,
  LocalFileEntity,
} from '@src/models';
import { LEATHER_CLASSIFICATION_DATA, MATERNITY, sizes } from '@src/utils';
import { Formik, FormikProps } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {}

export const CustomerDetailInitialExaminationInfo: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectLeatherClassificationRef =
    useRef<SelectLeatherClassificationRef>(null);
  const selectMaternityRef = useRef<SelectMaternityRef>(null);
  const attachmentPickerRef = useRef<AttachmentPickerRef>(null);
  const formikRef = useRef<FormikProps<CreateCustomerFormEntity>>(null);

  const [images, setImages] = useState<LocalFileEntity[]>([]);

  // Mock data - lấy khách hàng đầu tiên để demo
  const customerData = customersDummy[0];

  const initialValues: CreateCustomerFormEntity = {
    name: customerData.profile.name,
    gender: customerData.gender as any,
    type: customerData.type as any,
    phoneNumber: customerData.phoneNumber,
    stepTreatment: [],
    images: [],
    leather_classification: customerData.leather_classification,
    maternity: MATERNITY[0].value, // Default value
    medical_history: customerData.medical_history,
    pre_treatment: customerData.pre_treatment,
    other_info: customerData.other_info,
    skin_condition: customerData.skin_condition,
    routine: '',
    diagnostic: customerData.diagnostic,
    note: '',
  };

  const handleSave = (values: CreateCustomerFormEntity) => {
    // Combine form values with images
    const finalData = {
      ...values,
      images: images,
    };

    console.log('Saving medical info:', finalData);
    // TODO: Call API to update customer medical info
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

  const renderEditableMultilineField = (
    formik: FormikProps<CreateCustomerFormEntity>,
    fieldName: keyof CreateCustomerFormEntity,
    label: string,
    placeholder: string,
    isRequired: boolean = false,
  ) => (
    <Box gap={sizes._8sdp}>
      <FormTitle title={label as any} required={isRequired} />
      <AppInputMultipleLine
        value={formik.values[fieldName] as string}
        placeholder={t(placeholder)}
        onChangeText={value => formik.setFieldValue(fieldName, value)}
        errMessage={formik.errors[fieldName] as string}
        clearButtonMode="always"
        multiline
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
                {/* Phân loại da */}
                <Box gap={sizes._8sdp}>
                  <FormTitle title="customer_create_leather_classification" />
                  {isEditing ? (
                    <AppSelectForm
                      onPress={() =>
                        selectLeatherClassificationRef.current?.open()
                      }
                      placeholder="customer_create_leather_classification_placeholder"
                      errMessage={formikProps.errors.leather_classification}
                      value={LEATHER_CLASSIFICATION_DATA.find(
                        e =>
                          e.value === formikProps.values.leather_classification,
                      )}
                    />
                  ) : (
                    <AppText
                      color={Colors.content}
                      fontFamily="content_regular"
                    >
                      {LEATHER_CLASSIFICATION_DATA.find(
                        e =>
                          e.value === formikProps.values.leather_classification,
                      )?.label ||
                        formikProps.values.leather_classification ||
                        t('empty_value')}
                    </AppText>
                  )}
                </Box>

                {/* Tình trạng thai sản */}
                <Box gap={sizes._8sdp}>
                  <FormTitle title="customer_create_maternity" />
                  {isEditing ? (
                    <AppSelectForm
                      onPress={() => selectMaternityRef.current?.open()}
                      placeholder="customer_create_maternity_placeholder"
                      errMessage={formikProps.errors.maternity}
                      value={MATERNITY.find(
                        e => e.value === formikProps.values.maternity,
                      )}
                    />
                  ) : (
                    <AppText
                      color={Colors.content}
                      fontFamily="content_regular"
                    >
                      {MATERNITY.find(
                        e => e.value === formikProps.values.maternity,
                      )?.label || t('empty_value')}
                    </AppText>
                  )}
                </Box>

                {/* Tiền sử bệnh */}
                {isEditing
                  ? renderEditableMultilineField(
                      formikProps,
                      'medical_history',
                      'customer_create_medical_history',
                      'customer_create_medical_history_placeholder',
                      true,
                    )
                  : renderField(
                      'customer_create_medical_history',
                      formikProps.values.medical_history,
                      true,
                    )}

                {/* Điều trị trước đó */}
                {isEditing
                  ? renderEditableMultilineField(
                      formikProps,
                      'pre_treatment',
                      'customer_create_pre_treatment',
                      'customer_create_pre_treatment_placeholder',
                    )
                  : renderField(
                      'customer_create_pre_treatment',
                      formikProps.values.pre_treatment,
                    )}

                {/* Tình trạng da hiện tại */}
                {isEditing
                  ? renderEditableMultilineField(
                      formikProps,
                      'skin_condition',
                      'customer_create_skin_condition',
                      'customer_create_skin_condition_placeholder',
                    )
                  : renderField(
                      'customer_create_skin_condition',
                      formikProps.values.skin_condition,
                    )}

                {/* Chuẩn đoán */}
                {isEditing
                  ? renderEditableMultilineField(
                      formikProps,
                      'diagnostic',
                      'customer_create_diagnostic',
                      'customer_create_diagnostic_placeholder',
                    )
                  : renderField(
                      'customer_create_diagnostic',
                      formikProps.values.diagnostic,
                    )}

                {/* Thông tin khác */}
                {isEditing
                  ? renderEditableMultilineField(
                      formikProps,
                      'other_info',
                      'customer_create_note',
                      'customer_create_note_placeholder',
                    )
                  : renderField(
                      'customer_create_note',
                      formikProps.values.other_info,
                    )}

                {/* Hình ảnh */}
                <Box gap={sizes._8sdp}>
                  <Box horizontal justify="space-between">
                    <AppText
                      translationKey="customer_create_image"
                      fontFamily="content_semibold"
                    />
                    {isEditing && (
                      <TouchableOpacity
                        onPress={() => attachmentPickerRef.current?.open()}
                        hitSlop={{
                          top: sizes._12sdp,
                          bottom: sizes._12sdp,
                          left: sizes._12sdp,
                          right: sizes._12sdp,
                        }}
                      >
                        <SelectImageIcon />
                      </TouchableOpacity>
                    )}
                  </Box>
                  <Box>
                    <GridImage
                      localImages={isEditing ? images : []}
                      remoteImages={!isEditing ? customerData.images : []}
                    />
                  </Box>
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

            {/* Select Modals */}
            <SelectLeatherClassification
              ref={selectLeatherClassificationRef}
              onSelect={value => {
                formikProps.setFieldValue('leather_classification', value);
              }}
            />
            <SelectMaternity
              ref={selectMaternityRef}
              onSelect={value => {
                formikProps.setFieldValue('maternity', value);
              }}
            />
            <AttachmentPicker
              isMultiple
              ref={attachmentPickerRef}
              max_amount={6}
              onConfirm={data => {
                setImages(data);
                // Also update formik field if needed
                if (formikRef.current) {
                  formikRef.current.setFieldValue('images', data);
                }
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
    paddingBottom: sizes._180sdp,
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
