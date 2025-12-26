import { SuggestionIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppInputMultipleLine,
  AppSelectForm,
  AppText,
  Box,
  SelectLeatherClassificationRef,
  SelectMaternityRef,
  SelectSuggestionRef,
  showErrorMessage,
} from '@src/components';
import { CreateCustomerFormEntity, SuggestionEntity } from '@src/models';
import {
  ACTIVE_OPACITY_TOUCH,
  LEATHER_CLASSIFICATION_DATA,
  MATERNITY_DATA,
  sizes,
} from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  selectLeatherClassificationRef: React.RefObject<SelectLeatherClassificationRef>;
  selectMaternityRef: React.RefObject<SelectMaternityRef>;
  selectSuggestionRef: React.RefObject<SelectSuggestionRef>;
  suggestionsData?: SuggestionEntity;
}

export const Step2MedicalInfo: FC<Props> = ({
  formik,
  selectLeatherClassificationRef,
  selectMaternityRef,
  selectSuggestionRef,
  suggestionsData,
}) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;

  const leatherValue = LEATHER_CLASSIFICATION_DATA.find(
    e => e.value === values.leatherClassification,
  );
  const maternityValue = MATERNITY_DATA.find(e => e.value === values.maternity);

  const handleSuggestion = useCallback(() => {
    const suggestions = suggestionsData?.medicalHistory || [];
    if (suggestions.length === 0) {
      showErrorMessage('notification', t('suggestion_empty_message'));
      return;
    }
    selectSuggestionRef.current?.open({
      suggestions,
      onConfirm: (selectedItems: string[]) => {
        if (selectedItems.length === 0) return;
        const currentValue = values.medicalHistory || '';
        const newValue = currentValue
          ? `${currentValue}\n${selectedItems.join('\n')}`
          : selectedItems.join('\n');
        setFieldValue('medicalHistory', newValue);
      },
    });
  }, [
    suggestionsData,
    selectSuggestionRef,
    values.medicalHistory,
    setFieldValue,
    t,
  ]);

  return (
    <Box gap={sizes._16sdp}>
      {/* Phân loại da */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_leather_classification"
          fontFamily="content_semibold"
        />
        <AppSelectForm
          onPress={() => selectLeatherClassificationRef.current?.open()}
          placeholder="customer_create_leather_classification_placeholder"
          errMessage={errors.leatherClassification}
          value={leatherValue}
        />
      </Box>

      {/* Tình trạng thai sản */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_maternity"
          fontFamily="content_semibold"
        />
        <AppSelectForm
          onPress={() => selectMaternityRef.current?.open()}
          placeholder="customer_create_maternity_placeholder"
          errMessage={errors.maternity}
          value={maternityValue}
        />
      </Box>

      {/* Tiền sử bệnh */}
      <Box gap={sizes._8sdp}>
        <Box direction="horizontal" justify="space-between">
          <AppText
            translationKey="customer_create_medical_history"
            fontFamily="content_semibold"
          />
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            onPress={handleSuggestion}
          >
            <SuggestionIcon color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <AppInputMultipleLine
          value={values.medicalHistory}
          placeholder={t('customer_create_medical_history_placeholder')}
          onChangeText={value => setFieldValue('medicalHistory', value)}
          errMessage={errors.medicalHistory}
          clearButtonMode="while-editing"
          multiline
        />
      </Box>
    </Box>
  );
};
