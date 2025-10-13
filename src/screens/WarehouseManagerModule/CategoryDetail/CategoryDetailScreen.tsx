import { RouteProp, useRoute } from '@react-navigation/native';
import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppButton,
  AppHeader,
  AppInput,
  AppText,
  Box,
  FormTitle,
  globalLoading,
  PageContainer,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import { CategoryEntity, CreateCategoryFormValuesEntity } from '@src/models';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import { CategoryService } from '@src/services';
import { DEFAULT_HIT_SLOP, sizes } from '@src/utils';
import { categoryValidationSchema } from '@src/utils/validations/category';
import { Formik, FormikProps } from 'formik';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {}
export const CategoryDetailScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.CATEGORY_DETAIL>>();
  const categoryId = route?.params?.categoryId;
  const { t } = useTranslation();
  const { Colors } = useAppTheme();

  const [category, setCategory] = useState<CategoryEntity>();
  const [isEditing, setIsEditing] = useState(false);
  const formikRef = useRef<FormikProps<CreateCategoryFormValuesEntity>>(null);

  const getCategory = useCallback(async () => {
    try {
      if (categoryId) {
        globalLoading.show();
        const response = await CategoryService.getCategoryDetail(categoryId);
        setCategory(response.data);
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [categoryId]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const getInitialValues = (): CreateCategoryFormValuesEntity => ({
    sku: category?.sku || '',
    store: category?.store?.id || '',
    name: category?.name || '',
  });

  const handleSave = async (values: CreateCategoryFormValuesEntity) => {
    try {
      globalLoading.show();

      await CategoryService.updateCategory(categoryId!, values);
      await getCategory();
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
    if (!category) return null;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Box gap={sizes._16sdp}>
          {/* SKU */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.category.create.sku"
              fontFamily="content_semibold"
            />
            <AppText>{category.sku}</AppText>
          </Box>

          {/* Name */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.category.create.name"
              fontFamily="content_semibold"
            />
            <AppText>{category.name}</AppText>
          </Box>

          {/* Product Count */}
          <Box gap={sizes._8sdp}>
            <AppText
              translationKey="warehouse.category.productCount"
              fontFamily="content_semibold"
            />
            <AppText>{category.productCount}</AppText>
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
      validationSchema={categoryValidationSchema(t)}
      onSubmit={handleSave}
    >
      {formikProps => (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Box gap={sizes._16sdp}>
              {/* SKU */}
              <Box gap={sizes._8sdp}>
                <FormTitle title="warehouse.category.create.sku" required />
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
                <FormTitle title="warehouse.category.create.name" required />
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
        </>
      )}
    </Formik>
  );

  const deleteCategory = useCallback(async () => {
    try {
      if (categoryId) {
        globalLoading.show();
        await CategoryService.deleteCategory(categoryId);
        showSuccessMessage('action_success_message', 'empty_string');
        goBack();
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [categoryId]);

  const _handleDeleteProduct = useCallback(async () => {
    if (categoryId) {
      Alert.alert(t('delete_confirm_title'), t('delete_confirm_desciption'), [
        {
          text: t('delete_rollback'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // On iOS, this makes the button appear as a cancel button
        },
        {
          text: t('delete_ok'),
          onPress: () => deleteCategory(),
        },
      ]);
    }
  }, [deleteCategory, categoryId, t]);

  return (
    <PageContainer style={styles.container}>
      <AppHeader
        title="warehouse.category.detail.title"
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
      {category ? (
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
          <AppText translationKey="warehouse.category.detail.error" />
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
