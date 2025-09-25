import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppInput,
  AppInputMultipleLine,
  AppSelectForm,
  AppText,
  Box,
  CosmeticItem,
  DateTimePicker,
  DateTimePickerReft,
  FormTitle,
  SelectCosmetics,
  SelectCosmeticsRef,
} from '@src/components';

import { TreatmentCreateFormValuesEntity, TreatmentEntity } from '@src/models';
import { formatDateTime, sizes, treatmentValidationSchema } from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {
  treatment: TreatmentEntity;
}
export const TreatmentInfo: FC<Props> = ({ treatment }) => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const datetimePickerRef = useRef<DateTimePickerReft>(null);
  const cosmeticsSelectRef = useRef<SelectCosmeticsRef>(null);

  // Lazy initialization - chỉ tạo khi cần edit
  const getInitialValues = (): TreatmentCreateFormValuesEntity => ({
    implementation_date: new Date(treatment.implementation_date)
      .toISOString()
      .slice(0, 16),
    title: treatment.title,
    note: treatment.note,
    cosmetics: treatment.cosmetics,
    total_treatment_fee: treatment.total_treatment_fee,
    debt: treatment.debt,
    paid: treatment.paid,
  });

  const handleSave = (values: TreatmentCreateFormValuesEntity) => {
    console.log('Saving treatment:', values);
    // TODO: Call API to update treatment
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Render View Mode - Không dùng Formik
  const renderViewMode = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: sizes._120sdp, // Tăng padding để không bị che bởi edit button
        gap: sizes._16sdp,
        padding: sizes._16sdp,
      }}
    >
      <Box gap={sizes._8sdp}>
        <FormTitle title="treatment_create_title" required />
        <AppText color={Colors.content} fontFamily="content_regular">
          {treatment.title || t('empty_value')}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <FormTitle title="treatment_create_time_implementation_date" required />
        <AppText color={Colors.content} fontFamily="content_regular">
          {formatDateTime(treatment.implementation_date, 'dd/mm/yyyy')}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <FormTitle title="treatment_create_note" required />
        <AppText color={Colors.content} fontFamily="content_regular">
          {treatment.note || t('empty_value')}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="treatment_create_cosmetics"
          fontFamily="content_semibold"
        />
        {treatment.cosmetics.map(item => (
          <CosmeticItem
            key={item.id}
            item={item}
            edited={false}
            onChange={() => {}}
          />
        ))}
      </Box>
    </ScrollView>
  );

  // Render Edit Mode - Có Formik
  const renderEditMode = () => (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={treatmentValidationSchema(t)}
      onSubmit={handleSave}
    >
      {({ handleSubmit, errors, values, setFieldValue }) => (
        <React.Fragment>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: sizes._120sdp, // Tăng padding để không bị che bởi action buttons
              gap: sizes._16sdp,
              padding: sizes._16sdp,
            }}
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
              <AppText
                translationKey="treatment_create_cosmetics"
                fontFamily="content_semibold"
              />
              <AppSelectForm
                onPress={() => cosmeticsSelectRef.current?.open()}
                placeholder="treatment_create_cosmetics_placeholder"
                value={undefined}
              />
              {values.cosmetics.map(item => (
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
              ))}
            </Box>
          </ScrollView>

          {/* Action Buttons */}
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
              onPress={handleCancel}
              style={[
                styles.actionButtonHalf,
                { backgroundColor: Colors.disableButtonBackground },
              ]}
              titleColor={Colors.black}
            />
            <AppButton
              title="step_button_save"
              onPress={handleSubmit}
              style={styles.actionButtonHalf}
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
  );

  return (
    <Box style={styles.container}>
      {isEditing ? (
        renderEditMode()
      ) : (
        <Box style={styles.container}>
          {renderViewMode()}
          {/* Edit Button - chỉ hiện trong view mode */}
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
        </Box>
      )}
    </Box>
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
  actionButtonHalf: {
    flex: 1,
    borderRadius: sizes._12sdp,
  },
});
