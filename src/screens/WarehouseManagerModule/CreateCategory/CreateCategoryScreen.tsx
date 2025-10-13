import { useAppTheme, useSelector } from '@src/common';
import {
  AppButton,
  AppHeader,
  AppInput,
  Box,
  FormTitle,
  globalLoading,
  PageContainer,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import { CreateCategoryFormValuesEntity } from '@src/models';
import { goBack } from '@src/navigator';
import { CategoryService } from '@src/services';
import { sizes } from '@src/utils';
import { categoryValidationSchema } from '@src/utils/validations/category';
import { Formik } from 'formik';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
interface Props {}
export const CreateCategoryScreen: FC<Props> = () => {
  const store = useSelector(x => x.facilityReducer.facility);
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

  const getInitialValues = (): CreateCategoryFormValuesEntity => ({
    sku: '',
    store: store?.id ?? '',
    name: '',
  });

  const validationSchema = React.useMemo(
    () => categoryValidationSchema(t),
    [t],
  );

  const _handleCreateCategory = useCallback(
    async (values: CreateCategoryFormValuesEntity) => {
      try {
        if (values.store) {
          globalLoading.show();
          console.log('_handleCreateProduct', values);

          await CategoryService.createCategory(values);
          showSuccessMessage('action_success_message', 'empty_string');
          goBack();
        }
      } catch (error: any) {
        console.log('_handleCreateCategory - error', error);
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [],
  );
  return (
    <PageContainer style={styles.container}>
      <AppHeader title="warehouse.category.create.title" showBack={true} />
      <Box style={styles.container}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log('values', values);
            _handleCreateCategory(values);
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
                  <FormTitle title="warehouse.category.create.sku" required />
                  <AppInput
                    value={values.sku}
                    placeholder={t('')}
                    onChangeText={value => setFieldValue('sku', value)}
                    errMessage={errors.sku}
                    clearButtonMode="while-editing"
                  />
                </Box>

                <Box gap={sizes._8sdp}>
                  <FormTitle title="warehouse.category.create.name" required />
                  <AppInput
                    value={values.name}
                    placeholder={t('')}
                    onChangeText={value => setFieldValue('name', value)}
                    errMessage={errors.name}
                    clearButtonMode="while-editing"
                  />
                </Box>
              </ScrollView>
              <Box
                style={[
                  styles.actionContainer,
                  {
                    backgroundColor: Colors.defaultPageBackground,
                    borderTopColor: Colors.divider,
                  },
                ]}
              >
                <AppButton title="step_button_save" onPress={handleSubmit} />
              </Box>
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
  content: {
    flexGrow: 1,
    paddingBottom: sizes._240sdp, // Reduced từ 256sdp
    gap: sizes._16sdp,
    padding: sizes._16sdp, // Add padding cho content
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: sizes._16sdp,
    borderTopWidth: sizes._1sdp,
  },
});
