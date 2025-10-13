import {
  AppButton,
  AppHeader,
  AppInput,
  AppSelectForm,
  Box,
  FormTitle,
  globalLoading,
  PageContainer,
  SelectCategory,
  SelectCategoryRef,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import {
  CreateProductFormValuesEntity,
  CreateProductPayload,
} from '@src/models';

import { useAppTheme, useSelector } from '@src/common';
import { goBack } from '@src/navigator';
import { ProductService } from '@src/services';
import { productValidationSchema, sizes } from '@src/utils';
import { Formik } from 'formik';
import React, { FC, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Props {}
export const CreateProductScreen: FC<Props> = () => {
  const insert = useSafeAreaInsets();
  const store = useSelector(x => x.facilityReducer.facility);
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
  const selectCategoryRef = useRef<SelectCategoryRef>(null);

  const getInitialValues = (): CreateProductFormValuesEntity => ({
    sku: '',
    store: store?.id ?? '',
    category: undefined,
    name: '',
    inventory: 0,
    price: 0,
    originPrice: 0,
    description: '',
  });

  const validationSchema = React.useMemo(() => productValidationSchema(t), [t]);

  const _handleCreateProduct = useCallback(
    async (values: CreateProductFormValuesEntity) => {
      try {
        if (values.category) {
          globalLoading.show();
          console.log('_handleCreateProduct', values);
          const body: CreateProductPayload = {
            ...values,
            category: values.category?.id,
          };
          await ProductService.createProduct(body);
          showSuccessMessage('action_success_message', 'empty_string');
          goBack();
        }
      } catch (error: any) {
        console.log('_handleCreateProduct - error', error);
        showErrorMessage('error.title', error.message);
      } finally {
        globalLoading.hide();
      }
    },
    [],
  );
  return (
    <PageContainer disablePaddingBottom>
      <AppHeader title="warehouse.product.create.title" showBack={true} />
      <Box style={styles.container}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log('values', values);
            _handleCreateProduct(values);
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
                  <FormTitle
                    title="warehouse.product.create.selectCategory"
                    required
                  />
                  <AppSelectForm
                    onPress={() => selectCategoryRef.current?.open()}
                    placeholder="select_category_title"
                    errMessage={errors.category}
                    value={
                      values.category
                        ? {
                            id: values.category?.id,
                            value: values.category?.id,
                            label: values.category?.name,
                          }
                        : undefined
                    }
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle title="warehouse.product.create.sku" required />
                  <AppInput
                    value={values.sku}
                    placeholder={t('')}
                    onChangeText={value => setFieldValue('sku', value)}
                    errMessage={errors.sku}
                    clearButtonMode="while-editing"
                  />
                </Box>

                <Box gap={sizes._8sdp}>
                  <FormTitle title="warehouse.product.create.name" required />
                  <AppInput
                    value={values.name}
                    placeholder={t('')}
                    onChangeText={value => setFieldValue('name', value)}
                    errMessage={errors.name}
                    clearButtonMode="while-editing"
                  />
                </Box>

                <Box gap={sizes._8sdp}>
                  <FormTitle
                    title="warehouse.product.create.inventory"
                    required
                  />
                  <AppInput
                    value={values.inventory.toString()}
                    placeholder={t('')}
                    onChangeText={value =>
                      setFieldValue('inventory', Number(value))
                    }
                    errMessage={errors.inventory}
                    clearButtonMode="while-editing"
                    keyboardType="numeric"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle title="warehouse.product.create.price" required />
                  <AppInput
                    value={values.price.toString()}
                    placeholder={t('')}
                    onChangeText={value =>
                      setFieldValue('price', Number(value))
                    }
                    errMessage={errors.price}
                    clearButtonMode="while-editing"
                    keyboardType="numeric"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle
                    title="warehouse.product.create.originPrice"
                    required
                  />
                  <AppInput
                    value={values.originPrice.toString()}
                    placeholder={t('')}
                    onChangeText={value =>
                      setFieldValue('originPrice', Number(value))
                    }
                    errMessage={errors.originPrice}
                    clearButtonMode="while-editing"
                    keyboardType="numeric"
                  />
                </Box>
                <Box gap={sizes._8sdp}>
                  <FormTitle title="warehouse.product.create.description" />
                  <AppInput
                    value={values.description}
                    placeholder={t('')}
                    onChangeText={value => setFieldValue('description', value)}
                    errMessage={errors.description}
                    clearButtonMode="while-editing"
                  />
                </Box>
              </ScrollView>
              <Box
                style={[
                  styles.actionContainer,
                  {
                    paddingBottom: insert.top ? insert.top : sizes._16sdp,
                    backgroundColor: Colors.defaultPageBackground,
                    borderTopColor: Colors.divider,
                  },
                ]}
              >
                <AppButton title="step_button_save" onPress={handleSubmit} />
              </Box>
              <SelectCategory
                ref={selectCategoryRef}
                onSelect={value => setFieldValue('category', value)}
                valueSelect=""
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
