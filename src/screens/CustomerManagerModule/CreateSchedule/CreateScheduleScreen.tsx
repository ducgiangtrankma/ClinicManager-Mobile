import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppTheme, useSelector } from '@src/common';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppSelectForm,
  Box,
  FormTitle,
  globalLoading,
  PageContainer,
  showErrorMessage,
  TimePicker,
  TimePickerRef,
} from '@src/components';
import { CreateScheduleFormValuesEntity } from '@src/models';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import { ScheduleService } from '@src/services';
import {
  addEventToNativeCalender,
  formatDateTime,
  scheduleValidationSchema,
  sizes,
} from '@src/utils';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import React, { FC, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
interface Props {}
export const CreateScheduleScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.CREATE_SCHEDULE>>();
  const { t } = useTranslation();
  const { Colors } = useAppTheme();
  const { facility } = useSelector(x => x.facilityReducer);
  const defaultDate = route.params?.date;

  const timePickerRef = useRef<TimePickerRef>(null);
  // Lazy initialization - tối ưu performance
  const getInitialValues = (): CreateScheduleFormValuesEntity => ({
    store: facility?.id ?? '',
    implementationDate: defaultDate ?? dayjs().format('YYYY-MM-DD'),
    customer: undefined,
    treatment: undefined,
    note: '',
    eventId: '',
  });

  // Memoize validation schema
  const validationSchema = React.useMemo(
    () => scheduleValidationSchema(t),
    [t],
  );

  const handleCreateSchedule = useCallback(
    async (values: CreateScheduleFormValuesEntity) => {
      try {
        globalLoading.show();
        const eventId = await addEventToNativeCalender(
          values.note ?? '',
          values.implementationDate,
          values.implementationDate,
          values.note ?? '',
        );
        await ScheduleService.createSchedule({
          ...values,
          eventId,
        });
        goBack();
      } catch (error: any) {
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [],
  );
  return (
    <PageContainer>
      <AppHeader title="schedule_create" showBack />
      <Box style={styles.container}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={values => {
            handleCreateSchedule(values);
          }}
        >
          {({ handleSubmit, errors, values, setFieldValue }) => (
            <React.Fragment>
              <Box gap={sizes._8sdp}>
                <FormTitle title="schedule_create_date" required />
                <AppSelectForm
                  onPress={() => timePickerRef.current?.open()}
                  placeholder="schedule_create_date"
                  errMessage={errors.implementationDate}
                  value={{
                    id: '1',
                    label: formatDateTime(
                      values.implementationDate,
                      'dd/mm/yyyy HH:mm',
                    ),
                    value: values.implementationDate,
                  }}
                />
              </Box>
              <Box gap={sizes._8sdp} style={{ marginTop: sizes._12sdp }}>
                <FormTitle title="schedule_create_note" required />
                <AppInput
                  value={values.note}
                  placeholder={t('schedule_create_note')}
                  onChangeText={value => setFieldValue('note', value)}
                  errMessage={errors.note}
                  clearButtonMode="always"
                />
              </Box>
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
                  title="step_button_save"
                  onPress={handleSubmit}
                  style={styles.actionButton}
                />
              </Box>

              <TimePicker
                currentDate={
                  values.implementationDate
                    ? new Date(values.implementationDate)
                    : new Date()
                }
                ref={timePickerRef}
                onConfirm={value => {
                  setFieldValue('implementationDate', value);
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
    paddingHorizontal: sizes._24sdp,
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
