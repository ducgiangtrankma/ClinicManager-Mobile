import { SelectImageIcon } from '@src/assets';
import {
  AppInputMultipleLine,
  AppText,
  AttachmentPickerRef,
  Box,
  GridImage,
} from '@src/components';
import { CreateCustomerFormEntity, LocalFileEntity } from '@src/models';
import { sizes } from '@src/utils';
import { FormikProps } from 'formik';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

interface Props {
  formik: FormikProps<CreateCustomerFormEntity>;
  attachmentPickerRef: React.RefObject<AttachmentPickerRef>;
  images: LocalFileEntity[];
}

export const Step4DiagnosisAndNotes: FC<Props> = ({
  formik,
  attachmentPickerRef,
  images,
}) => {
  const { t } = useTranslation();
  const { errors, values, setFieldValue } = formik;

  return (
    <Box gap={sizes._16sdp}>
      {/* Chuẩn đoán */}
      <Box gap={sizes._8sdp}>
        <AppText
          translationKey="customer_create_diagnostic"
          fontFamily="content_semibold"
        />
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
        <AppText
          translationKey="customer_create_note"
          fontFamily="content_semibold"
        />
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
