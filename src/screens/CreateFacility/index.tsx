import {
  AppButton,
  AppHeader,
  AppInput,
  AppText,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { CreateFacilityFormEntity } from '@src/models';
import { createFacilityValidationSchema, sizes } from '@src/utils';
import { useTranslation } from 'react-i18next';
import { FacilityService } from '@src/services';
import { goBack } from '@src/navigator';

interface Props {}
export const CreateFacilityScreen: FC<Props> = () => {
  const { t } = useTranslation();
  const initialCreateFacilityValues: CreateFacilityFormEntity = {
    name: '',
    address: '',
  };
  const validationSignUpSchema = createFacilityValidationSchema(t);

  const _handleCreateFacility = useCallback(
    async (values: CreateFacilityFormEntity) => {
      try {
        globalLoading.show();
        await FacilityService.createFacility(values);
        goBack();
        showSuccessMessage('action_success_message', 'facility_create_success');
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
      <AppHeader title="create_facility_title" showBack />
      <Box style={styles.container}>
        <Formik
          initialValues={initialCreateFacilityValues}
          enableReinitialize
          validationSchema={validationSignUpSchema}
          onSubmit={values => _handleCreateFacility(values)}
        >
          {({ handleSubmit, errors, values, setFieldValue }) => (
            <Box style={styles.formContainer}>
              <Box gap={sizes._16sdp}>
                <Box gap={sizes._8sdp}>
                  <AppText
                    translationKey="facility_form_name"
                    fontFamily="content_semibold"
                  />
                  <AppInput
                    value={values.name}
                    placeholder={t('facility_form_name_placeholder')}
                    onChangeText={value => setFieldValue('name', value)}
                    errMessage={errors.name}
                    clearButtonMode="always"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <AppText
                    translationKey="facility_form_address"
                    fontFamily="content_semibold"
                  />
                  <AppInput
                    value={values.address}
                    placeholder={t('facility_form_address_placeholder')}
                    onChangeText={value => setFieldValue('address', value)}
                    errMessage={errors.address}
                    clearButtonMode="always"
                  />
                </Box>
              </Box>
              <AppButton
                title="create_facility_button"
                onPress={handleSubmit}
              />
            </Box>
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
  formContainer: { flex: 1, justifyContent: 'space-between' },
});
