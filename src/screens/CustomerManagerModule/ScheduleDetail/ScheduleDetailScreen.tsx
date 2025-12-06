import { RouteProp, useRoute } from '@react-navigation/native';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppSelectForm,
  AppText,
  Box,
  FormTitle,
  globalLoading,
  PageContainer,
  showErrorMessage,
  showSuccessMessage,
  TimePicker,
  TimePickerRef,
} from '@src/components';
import {
  CreateScheduleFormValuesEntity,
  UpdateScheduleFormValuesEntity,
} from '@src/models';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import {
  addEventToNativeCalender,
  DEFAULT_HIT_SLOP,
  deleteEvent,
  formatDateTime,
  isNativeEventId,
  scheduleValidationSchema,
  sizes,
  updateEventToNativeCalender,
} from '@src/utils';

import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
import { ScheduleService } from '@src/services';
import { Formik, FormikProps } from 'formik';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
interface Props {}
export const ScheduleDetailScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.SCHEDULE_DETAIL>>();
  const timePickerRef = useRef<TimePickerRef>(null);
  const { t } = useTranslation();
  const schedule = route.params?.schedule;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formikRef = useRef<FormikProps<CreateScheduleFormValuesEntity>>(null);
  const getInitialValues = (): CreateScheduleFormValuesEntity => ({
    store: schedule?.store.id ?? '',
    implementationDate: schedule?.implementationDate ?? '',
    customer: schedule?.customer?.id,
    treatment: schedule?.treatment?.id,
    note: schedule?.note ?? '',
    eventId: schedule?.eventId ?? '',
  });

  const handleSave = async (values: CreateScheduleFormValuesEntity) => {
    try {
      if (schedule?.id) {
        let newEventId = values.eventId;
        if (values.eventId) {
          if (isNativeEventId(values.eventId)) {
            await updateEventToNativeCalender(
              values.eventId,
              values.note ?? '',
              values.implementationDate,
              values.implementationDate,
              values.note ?? '',
            );
          } else {
            newEventId = await addEventToNativeCalender(
              values.note ?? '',
              values.implementationDate,
              values.implementationDate,
              values.note ?? '',
            );
          }
        }
        const updatePayload: UpdateScheduleFormValuesEntity = {
          implementationDate: values.implementationDate,
          note: values.note,
          eventId: newEventId,
        };
        globalLoading.show();
        await ScheduleService.updateSchedule(schedule?.id, updatePayload);
        goBack();
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  };

  const handleCancel = () => {
    formikRef.current?.resetForm();
    setIsEditing(false);
  };

  const renderViewMode = useCallback(() => {
    if (!schedule) return null;
    return (
      <Box
        style={[
          styles.container,
          { paddingHorizontal: sizes._24sdp, gap: sizes._12sdp },
        ]}
      >
        <Box gap={sizes._8sdp}>
          <AppText
            translationKey="schedule_create_date"
            fontFamily="content_semibold"
          />
          <AppText>
            {formatDateTime(schedule.implementationDate, 'dd/mm/yyyy HH:mm')}
          </AppText>
        </Box>
        <Box gap={sizes._8sdp}>
          <AppText
            translationKey="schedule_detail_customer"
            fontFamily="content_semibold"
          />
          <AppText>{schedule?.customer?.name ?? ''}</AppText>
        </Box>
        <Box gap={sizes._8sdp}>
          <AppText
            translationKey="schedule_create_note"
            fontFamily="content_semibold"
          />
          <AppText>{schedule.note}</AppText>
        </Box>
      </Box>
    );
  }, [schedule]);

  const renderEditMode = useCallback(() => {
    return (
      <Formik
        innerRef={formikRef}
        initialValues={getInitialValues()}
        validationSchema={scheduleValidationSchema(t)}
        onSubmit={handleSave}
      >
        {formikProps => (
          <Box style={[styles.container, { paddingHorizontal: sizes._16sdp }]}>
            <Box>
              <Box gap={sizes._8sdp}>
                <FormTitle title="schedule_create_date" required />
                <AppSelectForm
                  onPress={() => timePickerRef.current?.open()}
                  placeholder="schedule_create_date"
                  errMessage={formikProps.errors.implementationDate}
                  value={{
                    id: '1',
                    label: formatDateTime(
                      formikProps.values.implementationDate,
                      'dd/mm/yyyy HH:mm',
                    ),
                    value: formikProps.values.implementationDate,
                  }}
                />
              </Box>
              <Box gap={sizes._8sdp} style={{ marginTop: sizes._12sdp }}>
                <FormTitle title="schedule_create_note" required />
                <AppInput
                  value={formikProps.values.note}
                  placeholder={t('schedule_create_note')}
                  onChangeText={value =>
                    formikProps.setFieldValue('note', value)
                  }
                  errMessage={formikProps.errors.note}
                  clearButtonMode="always"
                />
              </Box>
            </Box>

            {/* Action Buttons - Edit Mode */}
            <Box
              direction="horizontal"
              gap={sizes._12sdp}
              style={[
                styles.actionContainer,
                {
                  backgroundColor: Colors.defaultPageBackground,
                  borderTopColor: Colors.divider,
                },
              ]}
            >
              <TouchableOpacity
                onPress={handleCancel}
                style={[
                  styles.actionButton,
                  { backgroundColor: Colors.cancelButton },
                ]}
              >
                <AppText
                  translationKey="datePicker.button.cancel"
                  fontFamily="content_medium"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => formikProps.handleSubmit()}
                style={[styles.actionButton, { backgroundColor: Colors.green }]}
              >
                <AppText
                  translationKey="step_button_save"
                  color={Colors.white}
                  fontFamily="content_bold"
                />
              </TouchableOpacity>
            </Box>

            <TimePicker
              currentDate={
                schedule ? new Date(schedule.implementationDate) : new Date()
              }
              ref={timePickerRef}
              onConfirm={value => {
                formikProps.setFieldValue('implementationDate', value);
              }}
            />
          </Box>
        )}
      </Formik>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Colors, schedule]);

  const deleteSchedule = useCallback(async () => {
    try {
      if (schedule) {
        globalLoading.show();
        if (schedule.eventId) {
          await deleteEvent(schedule.eventId);
        }
        await ScheduleService.deleteSchedule(schedule.id);
        showSuccessMessage('action_success_message', 'empty_string');
        goBack();
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [schedule]);

  const _handleDeleteSchedule = useCallback(async () => {
    if (schedule) {
      Alert.alert(t('delete_confirm_title'), t('delete_confirm_desciption'), [
        {
          text: t('delete_rollback'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // On iOS, this makes the button appear as a cancel button
        },
        {
          text: t('delete_ok'),
          onPress: () => deleteSchedule(),
        },
      ]);
    }
  }, [deleteSchedule, schedule, t]);

  return (
    <PageContainer style={styles.container}>
      <AppHeader
        title="schedule_detail_title"
        showBack
        rightContent={
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={_handleDeleteSchedule}
          >
            <DeleteUser color={Colors.error} />
          </TouchableOpacity>
        }
      />
      {schedule ? (
        <Box style={styles.content}>
          {isEditing ? renderEditMode() : renderViewMode()}

          {/* Edit Button - View Mode */}
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
      ) : (
        <Box style={styles.errorContainer}>
          <AppText translationKey="schedule_detail_error" />
        </Box>
      )}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: sizes._16sdp,
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
    paddingVertical: sizes._16sdp,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
