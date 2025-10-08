import { SelectImageIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppInput,
  AppInputMultipleLine,
  AppSelectForm,
  AppText,
  AttachmentPicker,
  AttachmentPickerRef,
  Box,
  CosmeticItem,
  DateTimePicker,
  DateTimePickerReft,
  FormTitle,
  globalLoading,
  GridImage,
  SelectCosmetics,
  SelectCosmeticsRef,
  showErrorMessage,
} from '@src/components';

import {
  AttachmentEntity,
  LocalFileEntity,
  TreatmentDetailEntity,
  TreatmentUpdateFormValuesEntity,
} from '@src/models';
import { AttachmentService, TreatmentService } from '@src/services';
import {
  formatDateTime,
  formatMoney,
  sizes,
  startsWithHttp,
  treatmentValidationSchema,
} from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  treatment: TreatmentDetailEntity;
  onUpdateSuccess: () => void;
}
export const TreatmentInfo: FC<Props> = ({ treatment, onUpdateSuccess }) => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();
  const [isEditing, setIsEditing] = useState(false);
  const datetimePickerRef = useRef<DateTimePickerReft>(null);
  const cosmeticsSelectRef = useRef<SelectCosmeticsRef>(null);
  const attachmentPickerRef = useRef<AttachmentPickerRef>(null);
  console.log('treatment.cosmetics,', treatment.cosmetics);

  const [images, setImages] = useState<LocalFileEntity[]>([]);
  // Lazy initialization - chỉ tạo khi cần edit
  const getInitialValues = (): TreatmentUpdateFormValuesEntity => ({
    implementation_date: new Date(treatment.implementationDate)
      .toISOString()
      .slice(0, 16),
    title: treatment.title,
    note: treatment.note,
    cosmetics: treatment.cosmetics,
    totalTreatmentFee: treatment.totalTreatmentFee,
    debt: treatment.debt,
    paid: treatment.paid,
    images: treatment.images,
  });
  console.log('treatment.images', treatment.images);
  const handleSave = useCallback(
    async (values: TreatmentUpdateFormValuesEntity) => {
      try {
        globalLoading.show();
        console.log('Saving treatment:', values);
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

        await TreatmentService.updateTreatment(treatment.id, {
          ...values,
          totalTreatmentFee: Number(values.totalTreatmentFee),
          images: [...imageIds, ...values.images.map(e => e.id)],
        });
        setIsEditing(false);
        onUpdateSuccess();
      } catch (error: any) {
        console.log('error', error);
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [images, onUpdateSuccess, treatment.id],
  );
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
          {formatDateTime(treatment.implementationDate, 'dd/mm/yyyy')}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <FormTitle title="treatment_create_note" required />
        <AppText color={Colors.content} fontFamily="content_regular">
          {treatment.note || t('empty_value')}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <FormTitle title="treatment_update_total_bill" required />
        <AppText color={Colors.content} fontFamily="content_regular">
          {formatMoney(treatment.totalTreatmentFee)}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <FormTitle title="treatment_update_paid" required />
        <AppText color={Colors.content} fontFamily="content_regular">
          {formatMoney(treatment.paid)}
        </AppText>
      </Box>

      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="treatment_create_cosmetics"
          fontFamily="content_semibold"
        />
        {treatment.cosmetics.map(item => (
          <CosmeticItem
            key={item.sku}
            item={item}
            edited={false}
            onChange={() => {}}
          />
        ))}
      </Box>
      {/* Hình ảnh */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="treatment_image"
          fontFamily="content_semibold"
        />
        <Box>
          <GridImage remoteImages={treatment.images} />
        </Box>
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
              <FormTitle title="treatment_update_total_bill" required />
              <AppInput
                value={String(values.totalTreatmentFee ?? '0')}
                placeholder={t('treatment_update_total_bill')}
                onChangeText={value =>
                  setFieldValue('totalTreatmentFee', value)
                }
                clearButtonMode="always"
                errMessage={errors.totalTreatmentFee}
                keyboardType="numeric"
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
            {/* Hình ảnh */}
            <Box gap={sizes._8sdp}>
              <Box horizontal justify="space-between">
                <AppText
                  translationKey="treatment_image"
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
                      setFieldValue(
                        'images',
                        values.images?.filter(x => x.id !== image.id),
                      );
                    } else {
                      const newLocalImages = images.filter(
                        e => e.fileName !== image.fileName,
                      );

                      setImages(newLocalImages);
                    }
                  }}
                  localImages={images}
                  remoteImages={values.images}
                />
              </Box>
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
          <AttachmentPicker
            isMultiple
            ref={attachmentPickerRef}
            max_amount={6}
            onConfirm={data => {
              // Chỉ lưu local vào state riêng, KHÔNG overwrite remote images trong Formik
              setImages(data);
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
