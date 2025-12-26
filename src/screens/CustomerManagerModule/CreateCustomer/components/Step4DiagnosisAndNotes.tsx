import { SelectImageIcon, SuggestionIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppInputMultipleLine,
  AppText,
  AttachmentPickerRef,
  Box,
  GridImage,
  SelectSuggestionRef,
  showErrorMessage,
} from '@src/components';
import {
  CreateCustomerFormEntity,
  LocalFileEntity,
  SuggestionEntity,
} from '@src/models';
import { ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  attachmentPickerRef: React.RefObject<AttachmentPickerRef>;
  images: LocalFileEntity[];
  selectSuggestionRef: React.RefObject<SelectSuggestionRef>;
  suggestionsData?: SuggestionEntity;
}

export const Step4DiagnosisAndNotes: FC<Props> = ({
  formik,
  attachmentPickerRef,
  images,
  selectSuggestionRef,
  suggestionsData,
}) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;

  const handleOpenSuggestion = useCallback(
    (field: 'diagnostic' | 'note', suggestionKey: 'diagnostic' | 'note') => {
      const suggestions = suggestionsData?.[suggestionKey] || [];
      if (suggestions.length === 0) {
        showErrorMessage('notification', t('suggestion_empty_message'));
        return;
      }
      selectSuggestionRef.current?.open({
        suggestions,
        onConfirm: (selectedItems: string[]) => {
          if (selectedItems.length === 0) return;
          const currentValue = values[field] || '';
          const newValue = currentValue
            ? `${currentValue}\n${selectedItems.join('\n')}`
            : selectedItems.join('\n');
          setFieldValue(field, newValue);
        },
      });
    },
    [suggestionsData, selectSuggestionRef, values, setFieldValue, t],
  );

  return (
    <Box gap={sizes._16sdp}>
      {/* Chuẩn đoán */}
      <Box gap={sizes._8sdp}>
        <Box direction="horizontal" justify="space-between">
          <AppText
            translationKey="customer_create_diagnostic"
            fontFamily="content_semibold"
          />
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            onPress={() => handleOpenSuggestion('diagnostic', 'diagnostic')}
          >
            <SuggestionIcon color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <AppInputMultipleLine
          value={values.diagnostic}
          placeholder={t('customer_create_diagnostic_placeholder')}
          onChangeText={value => setFieldValue('diagnostic', value)}
          errMessage={errors.diagnostic}
          clearButtonMode="always"
          multiline
        />
      </Box>

      {/* Ghi chú */}
      <Box gap={sizes._8sdp}>
        <Box direction="horizontal" justify="space-between">
          <AppText
            translationKey="customer_create_note"
            fontFamily="content_semibold"
          />
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            onPress={() => handleOpenSuggestion('note', 'note')}
          >
            <SuggestionIcon color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <AppInputMultipleLine
          value={values.note}
          placeholder={t('customer_create_note_placeholder')}
          onChangeText={value => setFieldValue('note', value)}
          errMessage={errors.note}
          clearButtonMode="always"
          multiline
        />
      </Box>

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
          <GridImage localImages={images} />
        </Box>
      </Box>
    </Box>
  );
};
