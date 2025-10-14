import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppHeader,
  AttachmentPicker,
  AttachmentPickerRef,
  Box,
  globalLoading,
  PageContainer,
  SelectCustomerType,
  SelectCustomerTypeRef,
  SelectGender,
  SelectGenderRef,
  SelectLeatherClassification,
  SelectLeatherClassificationRef,
  SelectMaternity,
  SelectMaternityRef,
  showErrorMessage,
} from '@src/components';
import { CreateCustomerProgress } from '@src/components/CreateCustomerStep';
import {
  AttachmentEntity,
  CreateCustomerBodyData,
  CreateCustomerFormEntity,
  CUSTOMER_TYPE,
  Gender,
  LocalFileEntity,
} from '@src/models';
import { goBack } from '@src/navigator';
import { AttachmentService, CustomerService } from '@src/services';
import {
  _screen_width,
  createCustomerValidationSchema,
  GENDER_DATA,
  LEATHER_CLASSIFICATION_DATA,
  MATERNITY_DATA,
  sizes,
} from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Step1BasicInfo,
  Step2MedicalInfo,
  Step3SkinCareHistory,
  Step4DiagnosisAndNotes,
} from './components';

interface Props {}
enum ChangeStepType {
  next = 'next',
  back = 'back',
}
export const CreateCustomerScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const insert = useSafeAreaInsets();
  const selectCustomerTypeRef: React.RefObject<SelectCustomerTypeRef> =
    React.createRef<any>();
  const selectLeatherClassificationRef: React.RefObject<SelectLeatherClassificationRef> =
    React.createRef<any>();
  const selectMaternityRef: React.RefObject<SelectMaternityRef> =
    React.createRef<any>();
  const selectGenderRef: React.RefObject<SelectGenderRef> =
    React.createRef<any>();
  const attachmentPickerRef: React.RefObject<AttachmentPickerRef> =
    React.createRef<any>();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [images, setImages] = useState<LocalFileEntity[]>([]);
  const formikRef = useRef<any>(null);

  // Validation functions for each step
  const validateStep = useCallback(
    (step: number, values: CreateCustomerFormEntity, errors: any) => {
      switch (step) {
        case 0: // Step 1: Basic Info
          return (
            !errors.name &&
            !errors.phoneNumber &&
            !errors.type &&
            values.name.trim() !== '' &&
            values.phoneNumber.trim() !== ''
          );
        case 1: // Step 2: Medical Info
          return true;
        // return (
        //   !errors.leather_classification &&
        //   !errors.maternity &&
        //   !errors.medical_history &&
        //   values.medical_history.trim() !== ''
        // );
        case 2: // Step 3: Skin Care History
          return true;
        // return (
        //   !errors.pre_treatment &&
        //   !errors.skin_condition &&
        //   !errors.routine &&
        //   values.pre_treatment.trim() !== '' &&
        //   values.skin_condition.trim() !== '' &&
        //   values.routine.trim() !== ''
        // );
        case 3: // Step 4: Diagnosis and Notes
          return true;
        // return (
        //   !errors.diagnostic &&
        //   !errors.note &&
        //   values.diagnostic.trim() !== '' &&
        //   values.note.trim() !== ''
        // );
        default:
          return true;
      }
    },
    [],
  );

  const handleChangeStep = useCallback(
    (type: ChangeStepType, submitForm?: () => void, formikProps?: any) => {
      if (type === ChangeStepType.back) {
        const newStep = currentStep - 1;
        if (newStep < 0) {
          return;
        } else {
          setCurrentStep(newStep);
        }
      } else {
        // Nếu đang ở step cuối cùng (step 3), submit form
        if (currentStep === 3) {
          if (submitForm) {
            submitForm();
          }
          return;
        }

        // Validate current step before proceeding
        if (formikProps) {
          const { values, validateForm, setTouched } = formikProps;

          // Trigger validation for current step
          validateForm().then((validationErrors: any) => {
            const isCurrentStepValid = validateStep(
              currentStep,
              values,
              validationErrors,
            );

            if (!isCurrentStepValid) {
              // Mark fields as touched to show validation errors
              const touchedFields: any = {};
              switch (currentStep) {
                case 0:
                  touchedFields.name = true;
                  touchedFields.phoneNumber = true;
                  touchedFields.type = true;
                  break;
                case 1:
                  touchedFields.leather_classification = true;
                  touchedFields.maternity = true;
                  touchedFields.medical_history = true;
                  break;
                case 2:
                  touchedFields.pre_treatment = true;
                  touchedFields.skin_condition = true;
                  touchedFields.routine = true;
                  break;
                case 3:
                  touchedFields.diagnostic = true;
                  touchedFields.note = true;
                  break;
              }
              setTouched(touchedFields);
              showErrorMessage(
                'notification',
                `${t('validation.step_incomplete')}`,
              );

              return;
            }

            // If validation passes, proceed to next step
            const newStep = currentStep + 1;
            if (newStep <= 3) {
              setCurrentStep(newStep);
            }
          });
        } else {
          // Fallback: proceed without validation if formikProps not available
          const newStep = currentStep + 1;
          if (newStep <= 3) {
            setCurrentStep(newStep);
          }
        }
      }
    },
    [currentStep, validateStep, t],
  );

  const renderHeaderTile = useCallback(() => {
    if (currentStep === 0) return 'create_customer_step_1';
    if (currentStep === 1) return 'create_customer_step_2';
    if (currentStep === 2) return 'create_customer_step_3';
    if (currentStep === 3) return 'create_customer_step_4';
    return 'empty_string';
  }, [currentStep]);

  const renderCurrentStep = useCallback(
    (formik: any) => {
      switch (currentStep) {
        case 0:
          return (
            <Step1BasicInfo
              formik={formik}
              selectCustomerTypeRef={selectCustomerTypeRef}
              selectGenderRef={selectGenderRef}
            />
          );
        case 1:
          return (
            <Step2MedicalInfo
              formik={formik}
              selectLeatherClassificationRef={selectLeatherClassificationRef}
              selectMaternityRef={selectMaternityRef}
            />
          );
        case 2:
          return <Step3SkinCareHistory formik={formik} />;
        case 3:
          return (
            <Step4DiagnosisAndNotes
              formik={formik}
              attachmentPickerRef={attachmentPickerRef}
              images={images}
            />
          );
        default:
          return null;
      }
    },
    [
      currentStep,
      selectCustomerTypeRef,
      selectGenderRef,
      selectLeatherClassificationRef,
      selectMaternityRef,
      attachmentPickerRef,
      images,
    ],
  );

  //Form - Lazy initialization
  const getValidationSchema = () => createCustomerValidationSchema(t);
  const getInitialValues = (): CreateCustomerFormEntity => ({
    name: '',
    gender: Gender.Female,
    type: CUSTOMER_TYPE.retail,
    stepTreatment: [],
    images: [],
    phoneNumber: '',
    leatherClassification: LEATHER_CLASSIFICATION_DATA[0].value,
    maternity: MATERNITY_DATA[0].value,
    medicalHistory: '',
    preTreatment: '', // điều trị trước đó
    otherInfo: '', // thông tin khác
    skinCondition: '', // tình trạng da hiện tại
    routine: '',
    diagnostic: '', // chuẩn đoán
    note: '',
  });

  const _handleCreateCustomer = useCallback(
    async (customerData: CreateCustomerBodyData) => {
      try {
        globalLoading.show();
        let imageIds: string[] = [];
        // Upload images nếu có
        if (customerData.images && customerData.images.length > 0) {
          try {
            const uploadResponse = await AttachmentService.upload(
              customerData.images,
            );
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
          ...customerData,
          images: imageIds, // Array of string IDs
        };
        await CustomerService.createCustomer(createCustomerPayload);
        goBack();
      } catch (error: any) {
        console.log('error', error);
        showErrorMessage('error.title', error.message);
        throw error;
      } finally {
        globalLoading.hide();
      }
    },
    [],
  );

  return (
    <PageContainer>
      <AppHeader title={renderHeaderTile()} showBack />
      <Box style={styles.container} justify="space-between">
        <CreateCustomerProgress currentStep={currentStep} />
        <Box style={styles.formContainer}>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={getValidationSchema()}
            onSubmit={values => {
              console.log('values', values);
              const finalData = {
                ...values,
                images: images,
              };

              console.log('Final form data:', finalData);
              _handleCreateCustomer(finalData);
            }}
          >
            {formikProps => {
              formikRef.current = formikProps;

              return (
                <>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: sizes._56sdp }}
                  >
                    {renderCurrentStep(formikProps)}
                  </ScrollView>
                  <Box
                    horizontal
                    justify="space-between"
                    style={[
                      styles.actionContainer,
                      {
                        paddingBottom:
                          insert.bottom === 0 ? sizes._16sdp : insert.bottom,
                      },
                    ]}
                  >
                    <AppButton
                      onPress={() => handleChangeStep(ChangeStepType.back)}
                      title="step_button_title_back"
                      style={[
                        styles.baseStepButton,
                        { backgroundColor: Colors.disableButtonBackground },
                      ]}
                      titleColor={Colors.black}
                    />
                    <AppButton
                      onPress={() =>
                        handleChangeStep(
                          ChangeStepType.next,
                          formikProps.handleSubmit,
                          formikProps,
                        )
                      }
                      title={
                        currentStep === 3
                          ? 'step_button_save'
                          : 'step_button_tile_next'
                      }
                      style={styles.baseStepButton}
                    />
                  </Box>
                </>
              );
            }}
          </Formik>
        </Box>
      </Box>

      <SelectCustomerType
        ref={selectCustomerTypeRef}
        onSelect={value => {
          if (formikRef.current) {
            formikRef.current.setFieldValue('type', value.value);
          }
        }}
      />
      <SelectLeatherClassification
        ref={selectLeatherClassificationRef}
        valueSelect={
          formikRef.current?.values?.leather_classification ||
          LEATHER_CLASSIFICATION_DATA[0].value
        }
        onSelect={value => {
          if (formikRef.current) {
            formikRef.current.setFieldValue(
              'leather_classification',
              value.value,
            );
            selectLeatherClassificationRef.current.close();
          }
        }}
      />
      <SelectMaternity
        ref={selectMaternityRef}
        valueSelect={
          formikRef.current?.values?.maternity || MATERNITY_DATA[0].value
        }
        onSelect={value => {
          if (formikRef.current) {
            formikRef.current.setFieldValue('maternity', value.value);
            selectMaternityRef.current.close();
          }
        }}
      />
      <SelectGender
        ref={selectGenderRef}
        valueSelect={formikRef.current?.values?.gender || GENDER_DATA[1].value}
        onSelect={value => {
          if (formikRef.current) {
            formikRef.current.setFieldValue('gender', value.value);
            selectGenderRef.current.close();
          }
        }}
      />
      <AttachmentPicker
        isMultiple
        ref={attachmentPickerRef}
        max_amount={6}
        onConfirm={data => {
          setImages(data);
          if (formikRef.current) {
            formikRef.current.setFieldValue('images', data);
          }
        }}
      />
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes._24sdp,
  },

  formContainer: {
    flex: 1,
    paddingTop: sizes._24sdp,
  },
  actionContainer: {
    width: '100%',
  },
  baseStepButton: {
    width: (_screen_width - sizes._48sdp - sizes._8sdp) / 2,
    borderRadius: sizes._12sdp,
  },
});
