// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useAppTheme } from '@src/common';
// import {
//   AppButton,
//   AppHeader,
//   AppInput,
//   AppInputMultipleLine,
//   AppSelectForm,
//   AppText,
//   Box,
//   PageContainer,
//   SelectCustomerType,
//   SelectCustomerTypeRef,
//   SelectLeatherClassification,
//   SelectLeatherClassificationRef,
//   SelectMaternity,
//   SelectMaternityRef,
// } from '@src/components';
// import { CreateCustomerProgress } from '@src/components/CreateCustomerStep';
// import { CreateCustomerFormEntity, CUSTOMER_TYPE, Sex } from '@src/models';
// import {
//   _screen_width,
//   createCustomerValidationSchema,
//   LEATHER_CLASSIFICATION_DATA,
//   MATERNITY,
//   sizes,
// } from '@src/utils';
// import React, { FC, useCallback, useState } from 'react';
// import { ScrollView, StyleSheet } from 'react-native';
// import { Formik } from 'formik';
// import { useTranslation } from 'react-i18next';

// interface Props {}
// enum ChangeStepType {
//   next = 'next',
//   back = 'back',
// }
// export const CreateCustomerFullScreen: FC<Props> = () => {
//   const { Colors } = useAppTheme();
//   const { t } = useTranslation();
//   const selectCustomerTypeRef: React.RefObject<SelectCustomerTypeRef> =
//     React.createRef<any>();
//   const selectLeatherClassificationRef: React.RefObject<SelectLeatherClassificationRef> =
//     React.createRef<any>();
//   const selectMaternityRef: React.RefObject<SelectMaternityRef> =
//     React.createRef<any>();
//   const [currentStep, setCurrentStep] = useState<number>(0);

//   const handleChangeStep = useCallback(
//     (type: ChangeStepType) => {
//       let newStep: number;
//       if (type === ChangeStepType.back) {
//         newStep = currentStep - 1;
//         if (newStep < 0) {
//           return;
//         } else {
//           setCurrentStep(newStep);
//         }
//       } else {
//         newStep = currentStep + 1;
//         if (newStep > 3) {
//           return;
//         } else {
//           setCurrentStep(newStep);
//         }
//       }
//     },
//     [currentStep],
//   );

//   const renderHeaderTile = useCallback(() => {
//     if (currentStep === 0) return 'create_customer_step_1';
//     if (currentStep === 1) return 'create_customer_step_2';
//     if (currentStep === 2) return 'create_customer_step_3';
//     if (currentStep === 3) return 'create_customer_step_4';
//     return 'empty_string';
//   }, [currentStep]);

//   //Form
//   const validationSignUpSchema = createCustomerValidationSchema(t);
//   const initialCreateCustomerValues: CreateCustomerFormEntity = {
//     name: '',
//     gender: Sex.Nu,
//     type: CUSTOMER_TYPE.retail,
//     stepTreatment: [],
//     images: [],
//     phoneNumber: '',
//     leather_classification: LEATHER_CLASSIFICATION_DATA[0].value,
//     maternity: MATERNITY[3].value,
//     medical_history: '',
//     pre_treatment: '', // điều trị trước đó
//     other_info: '', // thông tin khác
//     skin_condition: '', // tình trạng da hiện tại
//     routine: '',
//     diagnostic: '', // chuẩn đoán
//     note: '',
//   };
//   return (
//     <PageContainer>
//       <AppHeader title={renderHeaderTile()} showBack />
//       <Box style={styles.container} justify="space-between">
//         <CreateCustomerProgress currentStep={currentStep} />
//         <Box style={styles.formContainer}>
//           <Formik
//             initialValues={initialCreateCustomerValues}
//             enableReinitialize
//             validationSchema={validationSignUpSchema}
//             onSubmit={values => {
//               console.log('values', values);
//             }}
//           >
//             {({ handleSubmit, errors, values, setFieldValue }) => (
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: sizes._56sdp }}
//               >
//                 <Box gap={sizes._16sdp}>
//                   {/* Thông tin cơ bản - currentStep 0 */}
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_name"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInput
//                       value={values.name}
//                       placeholder={t('customer_create_name_placeholder')}
//                       onChangeText={value => setFieldValue('name', value)}
//                       errMessage={errors.name}
//                       clearButtonMode="always"
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_phoneNumber"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInput
//                       value={values.phoneNumber}
//                       placeholder={t('customer_create_phoneNumber_placeholder')}
//                       onChangeText={value =>
//                         setFieldValue('phoneNumber', value)
//                       }
//                       errMessage={errors.name}
//                       clearButtonMode="always"
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_type"
//                       fontFamily="content_semibold"
//                     />
//                     <AppSelectForm
//                       onPress={() => selectCustomerTypeRef.current.open()}
//                       placeholder="customer_create_type_placeholder"
//                       errMessage={errors.type}
//                       value={undefined}
//                     />
//                   </Box>
//                   {/* Thông tin y tế - currentStep 1 */}
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_leather_classification"
//                       fontFamily="content_semibold"
//                     />
//                     <AppSelectForm
//                       onPress={() =>
//                         selectLeatherClassificationRef.current.open()
//                       }
//                       placeholder="customer_create_leather_classification_placeholder"
//                       errMessage={errors.type}
//                       value={undefined}
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_maternity"
//                       fontFamily="content_semibold"
//                     />
//                     <AppSelectForm
//                       onPress={() => selectMaternityRef.current.open()}
//                       placeholder="customer_create_maternity_placeholder"
//                       errMessage={errors.type}
//                       value={undefined}
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_medical_history"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInputMultipleLine
//                       value={values.medical_history}
//                       placeholder={t(
//                         'customer_create_medical_history_placeholder',
//                       )}
//                       onChangeText={value =>
//                         setFieldValue('medical_history', value)
//                       }
//                       errMessage={errors.medical_history}
//                       clearButtonMode="always"
//                       multiline
//                     />
//                   </Box>
//                   {/* Tình trạng, lịch sử chăm sóc da - current step 2 */}
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_pre_treatment"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInputMultipleLine
//                       value={values.pre_treatment}
//                       placeholder={t(
//                         'customer_create_pre_treatment_placeholder',
//                       )}
//                       onChangeText={value =>
//                         setFieldValue('pre_treatment', value)
//                       }
//                       errMessage={errors.pre_treatment}
//                       clearButtonMode="always"
//                       multiline
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_skin_condition"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInputMultipleLine
//                       value={values.skin_condition}
//                       placeholder={t(
//                         'customer_create_skin_condition_placeholder',
//                       )}
//                       onChangeText={value =>
//                         setFieldValue('skin_condition', value)
//                       }
//                       errMessage={errors.skin_condition}
//                       clearButtonMode="always"
//                       multiline
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_routine"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInputMultipleLine
//                       value={values.routine}
//                       placeholder={t('customer_create_routine_placeholder')}
//                       onChangeText={value => setFieldValue('routine', value)}
//                       errMessage={errors.routine}
//                       clearButtonMode="always"
//                       multiline
//                     />
//                   </Box>
//                   {/* Chuẩn đoán và ghi chú - current step 3 */}
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_diagnostic"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInputMultipleLine
//                       value={values.diagnostic}
//                       placeholder={t('customer_create_diagnostic_placeholder')}
//                       onChangeText={value => setFieldValue('diagnostic', value)}
//                       errMessage={errors.diagnostic}
//                       clearButtonMode="always"
//                       multiline
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_note"
//                       fontFamily="content_semibold"
//                     />
//                     <AppInputMultipleLine
//                       value={values.note}
//                       placeholder={t('customer_create_note_placeholder')}
//                       onChangeText={value => setFieldValue('note', value)}
//                       errMessage={errors.diagnostic}
//                       clearButtonMode="always"
//                       multiline
//                     />
//                   </Box>
//                   <Box gap={sizes._8sdp}>
//                     <AppText
//                       translationKey="customer_create_image"
//                       fontFamily="content_semibold"
//                     />
//                   </Box>
//                 </Box>
//               </ScrollView>
//             )}
//           </Formik>
//         </Box>
//         <Box horizontal justify="space-between" style={styles.actionContainer}>
//           <AppButton
//             onPress={() => handleChangeStep(ChangeStepType.back)}
//             title="step_button_title_back"
//             style={[
//               styles.baseStepButton,
//               { backgroundColor: Colors.disableButtonBackground },
//             ]}
//             titleColor={Colors.black}
//           />
//           <AppButton
//             onPress={() => handleChangeStep(ChangeStepType.next)}
//             title={
//               currentStep === 3 ? 'step_button_save' : 'step_button_tile_next'
//             }
//             style={styles.baseStepButton}
//           />
//         </Box>
//       </Box>
//       <SelectCustomerType ref={selectCustomerTypeRef} />
//       <SelectLeatherClassification ref={selectLeatherClassificationRef} />
//       <SelectMaternity ref={selectMaternityRef} />
//     </PageContainer>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: sizes._24sdp,
//   },

//   formContainer: {
//     flex: 1,
//     paddingTop: sizes._24sdp,
//   },
//   actionContainer: {
//     width: '100%',
//   },
//   baseStepButton: {
//     width: (_screen_width - sizes._48sdp - sizes._8sdp) / 2,
//     borderRadius: sizes._12sdp,
//   },
// });
