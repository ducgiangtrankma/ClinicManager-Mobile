import { SuggestionIcon } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppInputMultipleLine,
  AppText,
  Box,
  SelectSuggestionRef,
  showErrorMessage,
} from '@src/components';
import { CreateCustomerFormEntity, SuggestionEntity } from '@src/models';
import { ACTIVE_OPACITY_TOUCH, sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  selectSuggestionRef: React.RefObject<SelectSuggestionRef>;
  suggestionsData?: SuggestionEntity;
}

export const Step3SkinCareHistory: FC<Props> = ({
  formik,
  selectSuggestionRef,
  suggestionsData,
}) => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;

  const handleOpenSuggestion = useCallback(
    (
      field: 'preTreatment' | 'skinCondition' | 'routine',
      suggestionKey: 'preTreatment' | 'skinCondition' | 'routine',
    ) => {
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
      {/* Điều trị trước đó */}
      <Box gap={sizes._8sdp}>
        <Box direction="horizontal" justify="space-between">
          <AppText
            translationKey="customer_create_pre_treatment"
            fontFamily="content_semibold"
          />
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            onPress={() => handleOpenSuggestion('preTreatment', 'preTreatment')}
          >
            <SuggestionIcon color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <AppInputMultipleLine
          value={values.preTreatment}
          placeholder={t('customer_create_pre_treatment_placeholder')}
          onChangeText={value => setFieldValue('preTreatment', value)}
          errMessage={errors.preTreatment}
          clearButtonMode="always"
          multiline
        />
      </Box>

      {/* Tình trạng da hiện tại */}
      <Box gap={sizes._8sdp}>
        <Box direction="horizontal" justify="space-between">
          <AppText
            translationKey="customer_create_skin_condition"
            fontFamily="content_semibold"
          />
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            onPress={() =>
              handleOpenSuggestion('skinCondition', 'skinCondition')
            }
          >
            <SuggestionIcon color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <AppInputMultipleLine
          value={values.skinCondition}
          placeholder={t('customer_create_skin_condition_placeholder')}
          onChangeText={value => setFieldValue('skinCondition', value)}
          errMessage={errors.skinCondition}
          clearButtonMode="always"
          multiline
        />
      </Box>

      {/* Quy trình chăm sóc */}
      <Box gap={sizes._8sdp}>
        <Box direction="horizontal" justify="space-between">
          <AppText
            translationKey="customer_create_routine"
            fontFamily="content_semibold"
          />
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY_TOUCH}
            onPress={() => handleOpenSuggestion('routine', 'routine')}
          >
            <SuggestionIcon color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <AppInputMultipleLine
          value={values.routine}
          placeholder={t('customer_create_routine_placeholder')}
          onChangeText={value => setFieldValue('routine', value)}
          errMessage={errors.routine}
          clearButtonMode="always"
          multiline
        />
      </Box>
    </Box>
  );
};
