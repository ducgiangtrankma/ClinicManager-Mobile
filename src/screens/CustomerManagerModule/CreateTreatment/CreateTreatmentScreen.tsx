import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppInputMultipleLine,
  AppSelectForm,
  AppText,
  Box,
  CosmeticItem,
  DateTimePicker,
  DateTimePickerReft,
  FormTitle,
  globalLoading,
  PageContainer,
  SelectCosmetics,
  SelectCosmeticsRef,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';

import {
  CreateTreatmentPayload,
  TreatmentCreateFormValuesEntity,
} from '@src/models';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import { TreatmentService } from '@src/services';
import { formatDateTime, sizes, treatmentValidationSchema } from '@src/utils';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React, { FC, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {}
export const CreateTreatmentScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.CREATE_TREATMENT>>();
  const customerId = route?.params?.customerId;
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const datetimePickerRef = useRef<DateTimePickerReft>(null);
  const cosmeticsSelectRef = useRef<SelectCosmeticsRef>(null);

  // Lazy initialization - tối ưu performance
  const getInitialValues = (): TreatmentCreateFormValuesEntity => ({
    implementation_date: dayjs().format('YYYY-MM-DD'),
    title: '',
    note: '',
    cosmetics: [],
    totalTreatmentFee: 0,
    debt: 0,
    paid: 0,
  });

  // Memoize validation schema
  const validationSchema = React.useMemo(
    () => treatmentValidationSchema(t),
    [t],
  );

  const _handleCreateTreatment = useCallback(
    async (values: TreatmentCreateFormValuesEntity) => {
      try {
        if (customerId) {
          const body: CreateTreatmentPayload = {
            title: values.title,
            note: values.note,
            implementationDate: values.implementation_date,
            cosmetics: values.cosmetics,
            customer: customerId,
            totalTreatmentFee: Number(values.totalTreatmentFee),
            debt: Number(values.debt),
            paid: Number(values.paid),
          };
          console.log('_handleCreateTreatment', body);
          await TreatmentService.createTreatment(body);
          showSuccessMessage('action_success_message', 'empty_string');
          goBack();
        }
      } catch (error: any) {
        console.log('error', error);
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [customerId],
  );

  return (
    <PageContainer>
      <AppHeader title="treatment_create_header" showBack />
      <Box style={styles.container}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={values => {
            _handleCreateTreatment(values);
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue }) => (
            <React.Fragment>
              <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
              >
                <Box gap={sizes._8sdp}>
                  <FormTitle title="treatment_create_title" required />
                  <AppInput
                    value={values.title}
                    placeholder={t('treatment_create_title_placeholder')}
                    onChangeText={value => setFieldValue('title', value)}
                    errMessage={errors.title}
                    clearButtonMode="always"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle
                    title="treatment_create_time_implementation_date"
                    required
                  />
                  <AppSelectForm
                    onPress={() => datetimePickerRef.current?.open()}
                    placeholder="customer_create_maternity_placeholder"
                    errMessage={errors.implementation_date}
                    value={{
                      id: '1',
                      label: formatDateTime(
                        values.implementation_date,
                        'dd/mm/yyyy',
                      ),
                      value: values.implementation_date,
                    }}
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle title="treatment_create_note" required />
                  <AppInputMultipleLine
                    value={values.note}
                    placeholder={t('treatment_create_note_placeholder')}
                    onChangeText={value => setFieldValue('note', value)}
                    errMessage={errors.note}
                    clearButtonMode="always"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle title="treatment_create_fee" />
                  <AppInput
                    value={values.totalTreatmentFee?.toString()}
                    placeholder={t('treatment_create_fee_placeholder')}
                    onChangeText={value =>
                      setFieldValue('totalTreatmentFee', value)
                    }
                    errMessage={errors.totalTreatmentFee}
                    clearButtonMode="always"
                    keyboardType="numeric"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <AppText
                    translationKey="treatment_create_cosmetics"
                    fontFamily="content_semibold"
                  />
                  <AppSelectForm
                    onPress={() => cosmeticsSelectRef.current?.open()}
                    placeholder="treatment_create_cosmetics_placeholder"
                    errMessage={errors.implementation_date}
                    value={undefined}
                  />
                  {/* {values.cosmetics.map(item => (
                    <CosmeticItem
                      key={item.id}
                      item={item}
                      edited={true}
                      onChange={value => {
                        const temp = [...values.cosmetics];
                        const newListCosmetic = temp.map(e => {
                          if (e.id === value.id) {
                            return {
                              ...e,
                              quantity: value.quantity,
                            };
                          } else {
                            return {
                              ...e,
                            };
                          }
                        });
                        setFieldValue('cosmetics', newListCosmetic);
                      }}
                    />
                  ))} */}
                  {values.cosmetics.map(item => (
                    <CosmeticItem
                      key={item.sku} // nhớ dùng key unique, ưu tiên sku/id
                      item={item}
                      edited
                      onChange={value => {
                        const newListCosmetic = values.cosmetics.map(e => {
                          if (e.sku === value.sku) {
                            return { ...e, quantity: value.quantity };
                          }
                          return e;
                        });
                        setFieldValue('cosmetics', newListCosmetic);
                      }}
                    />
                  ))}
                </Box>
              </ScrollView>
              <Box
                horizontal
                gap={sizes._16sdp}
                style={[
                  styles.actionContainer,
                  {
                    backgroundColor: Colors.defaultPageBackground,
                    borderTopColor: Colors.divider,
                  },
                ]}
              >
                <AppButton
                  title="step_button_title_back"
                  onPress={() => {}}
                  style={[
                    styles.actionButton,
                    { backgroundColor: Colors.disableButtonBackground },
                  ]}
                  titleColor={Colors.black}
                />
                <AppButton
                  title="step_button_save"
                  onPress={handleSubmit}
                  style={styles.actionButton}
                />
              </Box>
              <DateTimePicker
                ref={datetimePickerRef}
                value={values.implementation_date}
                onChange={date => setFieldValue('implementation_date', date)}
              />
              <SelectCosmetics
                ref={cosmeticsSelectRef}
                onSelect={value => {
                  setFieldValue('cosmetics', value);
                }}
              />
            </React.Fragment>
          )}
        </Formik>
      </Box>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    flexGrow: 1,
    paddingBottom: sizes._120sdp, // Reduced từ 256sdp
    gap: sizes._16sdp,
    padding: sizes._16sdp, // Add padding cho content
  },
});
