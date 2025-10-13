import { RouteProp, useRoute } from '@react-navigation/native';
import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
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
  SelectCategory,
  SelectCategoryRef,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import {
  CategoryEntity,
  CreateProductFormValuesEntity,
  CreateProductPayload,
  ProductDetailEntity,
} from '@src/models';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import { ProductService } from '@src/services';
import { DEFAULT_HIT_SLOP, productValidationSchema, sizes } from '@src/utils';
import { Formik, FormikProps } from 'formik';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {}
export const ProductDetailScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.PRODUCT_DETAIL>>();
  const productId = route?.params?.productId;
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

  const [product, setProduct] = useState<ProductDetailEntity>();
  const [isEditing, setIsEditing] = useState(false);
  const formikRef = useRef<FormikProps<CreateProductFormValuesEntity>>(null);
  const selectCategoryRef = useRef<SelectCategoryRef>(null);

  const getProduct = useCallback(async () => {
    try {
      if (productId) {
        globalLoading.show();
        const response = await ProductService.getProductDetail(productId);
        setProduct(response.data);
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [productId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const getInitialValues = (): CreateProductFormValuesEntity => ({
    sku: product?.sku || '',
    store: product?.store?.id || '',
    category: product?.category,
    name: product?.name || '',
    inventory: product?.inventory || 0,
    price: product?.price || 0,
    originPrice: product?.originPrice || 0,
    description: product?.description || '',
  });

  const handleSave = async (values: CreateProductFormValuesEntity) => {
    try {
      globalLoading.show();

      const updatePayload: CreateProductPayload = {
        ...values,
        category: values.category?.id || '',
      };

      await ProductService.updateProduct(productId!, updatePayload);
      await getProduct();
      setIsEditing(false);
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

  // Render View Mode
  const renderViewMode = () => {
    if (!product) return null;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Box gap={sizes._16sdp}>
          {/* SKU */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.sku"
              fontFamily="content_semibold"
            />
            <AppText>{product.sku}</AppText>
          </Box>

          {/* Name */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.name"
              fontFamily="content_semibold"
            />
            <AppText>{product.name}</AppText>
          </Box>

          {/* Category */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.selectCategory"
              fontFamily="content_semibold"
            />
            <AppText>{product.category?.name || '---'}</AppText>
          </Box>

          {/* Inventory */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.inventory"
              fontFamily="content_semibold"
            />
            <AppText>{product.inventory}</AppText>
          </Box>

          {/* Price */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.price"
              fontFamily="content_semibold"
            />
            <AppText>{product.price.toLocaleString()} VND</AppText>
          </Box>

          {/* Origin Price */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.originPrice"
              fontFamily="content_semibold"
            />
            <AppText>{product.originPrice.toLocaleString()} VND</AppText>
          </Box>

          {/* Description */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.product.create.description"
              fontFamily="content_semibold"
            />
            <AppText>{product.description || '---'}</AppText>
          </Box>
        </Box>
      </ScrollView>
    );
  };

  // Render Edit Mode
  const renderEditMode = () => (
    <Formik
      innerRef={formikRef}
      initialValues={getInitialValues()}
      validationSchema={productValidationSchema(t)}
      onSubmit={handleSave}
    >
      {formikProps => (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Box gap={sizes._16sdp}>
              {/* Category */}
              <Box gap={sizes._8sdp}>
                <FormTitle
                  title="warehouse.product.create.selectCategory"
                  required
                />
                <AppSelectForm
                  onPress={() => selectCategoryRef.current?.open()}
                  placeholder="select_category_title"
                  errMessage={formikProps.errors.category as string}
                  value={
                    formikProps.values.category
                      ? {
                          id: formikProps.values.category.id,
                          value: formikProps.values.category.id,
                          label: formikProps.values.category.name,
                        }
                      : undefined
                  }
                />
              </Box>

              {/* SKU */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="warehouse.product.create.sku" required />
                <AppInput
                  value={formikProps.values.sku}
                  placeholder={t('')}
                  onChangeText={value =>
                    formikProps.setFieldValue('sku', value)
                  }
                  errMessage={formikProps.errors.sku}
                  clearButtonMode="while-editing"
                />
              </Box>

              {/* Name */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="warehouse.product.create.name" required />
                <AppInput
                  value={formikProps.values.name}
                  placeholder={t('')}
                  onChangeText={value =>
                    formikProps.setFieldValue('name', value)
                  }
                  errMessage={formikProps.errors.name}
                  clearButtonMode="while-editing"
                />
              </Box>

              {/* Inventory */}
              <Box gap={sizes._8sdp}>
                <FormTitle
                  title="warehouse.product.create.inventory"
                  required
                />
                <AppInput
                  value={formikProps.values.inventory.toString()}
                  placeholder={t('')}
                  onChangeText={value =>
                    formikProps.setFieldValue(
                      'inventory',
                      parseInt(value, 10) || 0,
                    )
                  }
                  keyboardType="numeric"
                  errMessage={formikProps.errors.inventory}
                  clearButtonMode="while-editing"
                />
              </Box>

              {/* Price */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="warehouse.product.create.price" required />
                <AppInput
                  value={formikProps.values.price.toString()}
                  placeholder={t('')}
                  onChangeText={value =>
                    formikProps.setFieldValue('price', parseInt(value, 10) || 0)
                  }
                  keyboardType="numeric"
                  errMessage={formikProps.errors.price}
                  clearButtonMode="while-editing"
                />
              </Box>

              {/* Origin Price */}
              <Box gap={sizes._8sdp}>
                <FormTitle
                  title="warehouse.product.create.originPrice"
                  required
                />
                <AppInput
                  value={formikProps.values.originPrice.toString()}
                  placeholder={t('')}
                  onChangeText={value =>
                    formikProps.setFieldValue(
                      'originPrice',
                      parseInt(value, 10) || 0,
                    )
                  }
                  keyboardType="numeric"
                  errMessage={formikProps.errors.originPrice}
                  clearButtonMode="while-editing"
                />
              </Box>

              {/* Description */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="warehouse.product.create.description" />
                <AppInput
                  value={formikProps.values.description}
                  placeholder={t('')}
                  onChangeText={value =>
                    formikProps.setFieldValue('description', value)
                  }
                  clearButtonMode="while-editing"
                />
              </Box>
            </Box>
          </ScrollView>

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

          <SelectCategory
            ref={selectCategoryRef}
            onSelect={(value: CategoryEntity) => {
              formikProps.setFieldValue('category', value);
            }}
            valueSelect={formikProps.values.category?.id}
          />
        </>
      )}
    </Formik>
  );

  const deleteProduct = useCallback(async () => {
    try {
      if (productId) {
        globalLoading.show();
        await ProductService.deleteProduct(productId);
        showSuccessMessage('action_success_message', 'empty_string');
        goBack();
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [productId]);

  const _handleDeleteProduct = useCallback(async () => {
    if (productId) {
      Alert.alert(t('delete_confirm_title'), t('delete_confirm_desciption'), [
        {
          text: t('delete_rollback'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // On iOS, this makes the button appear as a cancel button
        },
        {
          text: t('delete_ok'),
          onPress: () => deleteProduct(),
        },
      ]);
    }
  }, [deleteProduct, productId, t]);

  return (
    <PageContainer style={styles.container}>
      <AppHeader
        title="warehouse.productDetail.tile"
        showBack={true}
        rightContent={
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={_handleDeleteProduct}
          >
            <DeleteUser color={Colors.error} />
          </TouchableOpacity>
        }
      />
      {product ? (
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
          <AppText translationKey="warehouse.product.detail.error" />
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
  scrollContent: {
    padding: sizes._16sdp,
    paddingBottom: sizes._100sdp,
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
