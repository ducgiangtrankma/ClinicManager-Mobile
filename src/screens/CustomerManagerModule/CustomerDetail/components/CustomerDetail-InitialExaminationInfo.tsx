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
  FormTitle,
  globalLoading,
  GridImage,
  SelectLeatherClassification,
  SelectLeatherClassificationRef,
  SelectMaternity,
  SelectMaternityRef,
  showErrorMessage,
} from '@src/components';
import {
  AttachmentEntity,
  CreateCustomerFormEntity,
  CustomerDetailEntity,
  LocalFileEntity,
} from '@src/models';
import { AttachmentService, CustomerService } from '@src/services';
import {
  LEATHER_CLASSIFICATION_DATA,
  MATERNITY_DATA,
  sizes,
  startsWithHttp,
} from '@src/utils';
import { Formik, FormikProps } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  customerInfo: CustomerDetailEntity;
  onUpdateSuccess: () => void;
}

export const CustomerDetailInitialExaminationInfo: FC<Props> = ({
  customerInfo,
  onUpdateSuccess,
}) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const selectLeatherClassificationRef =
    useRef<SelectLeatherClassificationRef>(null);
  const selectMaternityRef = useRef<SelectMaternityRef>(null);
  const attachmentPickerRef = useRef<AttachmentPickerRef>(null);
  const formikRef = useRef<FormikProps<CreateCustomerFormEntity>>(null);

  const [images, setImages] = useState<LocalFileEntity[]>([]);

  // Lazy initialization - chỉ tạo khi cần edit
  const getInitialValues = (): CreateCustomerFormEntity => ({
    name: customerInfo.name,
    gender: customerInfo.gender,
    type: customerInfo.type,
    phoneNumber: customerInfo.phoneNumber,
    stepTreatment: [],
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
      let imageIds: string[] = [];
      // Upload images nếu có
      if (images && images.length > 0) {
        try {
          const uploadResponse = await AttachmentService.upload(images);
          // Giả sử response trả về array of attachments với id
          if (uploadResponse.data && uploadResponse.data.success) {
            imageIds = uploadResponse.data.success.map(
              (attachment: AttachmentEntity) => attachment.id,
            );
          }
        } catch (uploadError: any) {
          showErrorMessage('error.title', uploadError.message);
        }
      }
      const createCustomerPayload = {
        ...values,
        images: [...imageIds, ...values.images.map(e => e.id)], // Array of string IDs
      };
      await CustomerService.updateCustomer(
        customerInfo.id,
        createCustomerPayload,
      );
      // goBack();
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
  // Deletion is handled inline in GridImage.onDelete below
  // Render View Mode - Không dùng Formik
  const renderViewMode = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <Box gap={sizes._16sdp}>
        {/* Phân loại da */}
        <Box gap={sizes._8sdp}>
          <FormTitle title="customer_create_leather_classification" />
          <AppText color={Colors.content} fontFamily="content_regular">
            {LEATHER_CLASSIFICATION_DATA.find(
              e => e.value === customerInfo.leatherClassification,
            )?.label ||
              customerInfo.leatherClassification ||
              t('empty_value')}
          </AppText>
        </Box>

        {/* Tình trạng thai sản */}
        <Box gap={sizes._8sdp}>
          <FormTitle title="customer_create_maternity" />
          <AppText color={Colors.content} fontFamily="content_regular">
            {MATERNITY_DATA.find(e => e.value === customerInfo.maternity)
              ?.label || t('empty_value')}
          </AppText>
        </Box>

        {/* Tiền sử bệnh */}
        {renderField(
          'customer_create_medical_history',
          customerInfo.medicalHistory,
          true,
        )}

        {/* Điều trị trước đó */}
        {renderField(
          'customer_create_pre_treatment',
          customerInfo.preTreatment,
        )}

        {/* Tình trạng da hiện tại */}
        {renderField(
          'customer_create_skin_condition',
          customerInfo.skinCondition,
        )}

        {/* Chuẩn đoán */}
        {renderField('customer_create_diagnostic', customerInfo.diagnostic)}

        {/* Thông tin khác */}
        {renderField('customer_create_note', customerInfo.otherInfo)}

        {/* Hình ảnh */}
        <Box gap={sizes._8sdp}>
          <AppText
            translationKey="customer_create_image"
            fontFamily="content_semibold"
          />
          <Box>
            <GridImage remoteImages={customerInfo.images} />
          </Box>
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Box gap={sizes._16sdp}>
              {/* Phân loại da */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="customer_create_leather_classification" />
                <AppSelectForm
                  onPress={() => selectLeatherClassificationRef.current?.open()}
                  placeholder="customer_create_leather_classification_placeholder"
                  errMessage={formikProps.errors.leatherClassification}
                  value={LEATHER_CLASSIFICATION_DATA.find(
                    e => e.value === formikProps.values.leatherClassification,
                  )}
                />
              </Box>

              {/* Tình trạng thai sản */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="customer_create_maternity" />
                <AppSelectForm
                  onPress={() => selectMaternityRef.current?.open()}
                  placeholder="customer_create_maternity_placeholder"
                  errMessage={formikProps.errors.maternity}
                  value={MATERNITY_DATA.find(
                    e => e.value === formikProps.values.maternity,
                  )}
                />
              </Box>

              {/* Tiền sử bệnh */}
              {renderEditableMultilineField(
                formikProps,
                'medicalHistory',
                'customer_create_medical_history',
                'customer_create_medical_history_placeholder',
                true,
              )}

              {/* Điều trị trước đó */}
              {renderEditableMultilineField(
                formikProps,
                'preTreatment',
                'customer_create_pre_treatment',
                'customer_create_pre_treatment_placeholder',
              )}

              {/* Tình trạng da hiện tại */}
              {renderEditableMultilineField(
                formikProps,
                'skinCondition',
                'customer_create_skin_condition',
                'customer_create_skin_condition_placeholder',
              )}

              {/* Chuẩn đoán */}
              {renderEditableMultilineField(
                formikProps,
                'diagnostic',
                'customer_create_diagnostic',
                'customer_create_diagnostic_placeholder',
              )}

              {/* Thông tin khác */}
              {renderEditableMultilineField(
                formikProps,
                'otherInfo',
                'customer_create_note',
                'customer_create_note_placeholder',
              )}

              {/* Hình ảnh */}
              <Box gap={sizes._8sdp}>
                <Box horizontal justify="space-between">
                  <AppText
                    translationKey="customer_create_image"
                    fontFamily="content_semibold"
                  />
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
                </Box>
                <Box>
                  <GridImage
                    onDelete={image => {
                      if (startsWithHttp(image.originalUrl)) {
                        formikProps.setFieldValue(
                          'images',
                          formikProps.values.images.filter(
                            x => x.id !== image.id,
                          ),
                        );
                      } else {
                        const newLocalImages = images.filter(
                          e => e.fileName !== image.fileName,
                        );

                        setImages(newLocalImages);
                      }
                    }}
                    localImages={images}
                    remoteImages={formikProps.values.images}
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

          {/* Select Modals */}
          <SelectLeatherClassification
            ref={selectLeatherClassificationRef}
            onSelect={value => {
              formikProps.setFieldValue('leatherClassification', value.value);
            }}
            valueSelect={
              formikRef.current?.values?.leatherClassification ||
              LEATHER_CLASSIFICATION_DATA[0].value
            }
          />
          <SelectMaternity
            ref={selectMaternityRef}
            onSelect={value => {
              formikProps.setFieldValue('maternity', value.value);
            }}
            valueSelect={
              formikRef.current?.values?.maternity || MATERNITY_DATA[0].value
            }
          />
          <AttachmentPicker
            isMultiple
            ref={attachmentPickerRef}
            max_amount={6}
            onConfirm={data => {
              // Chỉ lưu local vào state riêng, KHÔNG overwrite remote images trong Formik
              setImages(data);
            }}
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
