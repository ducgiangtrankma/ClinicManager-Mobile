import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppHeader,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
  showSuccessMessage,
} from '@src/components';
import {
  CustomerDetailMenubarEntity,
  CustomerInfoMenuBar,
  MenuType,
} from '@src/components/CustomerInfoMenuBar';
import { TreatmentScreen } from '@src/screens/Treatment';
import { DEFAULT_HIT_SLOP } from '@src/utils';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomerDetailInfo } from './components/CustomerDetail-Info';
import { CustomerDetailInitialExaminationInfo } from './components/CustomerDetail-InitialExaminationInfo';
import { CustomerDetailPayment } from './components/CustomerDetail-Payment';
import { RouteProp, useRoute } from '@react-navigation/native';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import { CustomerService } from '@src/services';
import { CustomerDetailEntity } from '@src/models';
import { useTranslation } from 'react-i18next';

interface Props {}
export const CustomerDetailScreen: FC<Props> = () => {
  const { t } = useTranslation();
  const { Colors } = useAppTheme();
  const [menuSelect, setMenuSelect] = useState<CustomerDetailMenubarEntity>({
    id: '1',
    name: 'customer_detail_menu_1',
    queryParam: '',
    type: MenuType.INFO,
  });
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.CUSTOMER_DETAIL>>();

  const customerId = route.params?.customerId;

  const [customerInfo, setCustomerInfo] = useState<CustomerDetailEntity>();

  const getCustomerDetail = useCallback(async () => {
    try {
      if (customerId) {
        const response = await CustomerService.getCustomerDetail(customerId);
        setCustomerInfo(response.data);
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    }
  }, [customerId, setCustomerInfo]);

  useEffect(() => {
    getCustomerDetail();
  }, [getCustomerDetail]);

  const renderContentInfo = useCallback(() => {
    if (!customerInfo) return <Box />;
    if (menuSelect.type === MenuType.INFO)
      return (
        <CustomerDetailInfo
          customerInfo={customerInfo}
          onUpdateSuccess={getCustomerDetail}
        />
      );
    if (menuSelect.type === MenuType.INITIAL_EXAMINATION_INFORMATION)
      return (
        <CustomerDetailInitialExaminationInfo
          customerInfo={customerInfo}
          onUpdateSuccess={getCustomerDetail}
        />
      );
    if (menuSelect.type === MenuType.TREATMENT)
      return (
        <TreatmentScreen
          customerId={customerInfo.id}
          customerName={customerInfo.name}
          onCreateSuccess={getCustomerDetail}
        />
      );
    if (menuSelect.type === MenuType.PAYMENT)
      return <CustomerDetailPayment customerInfo={customerInfo} />;
    return <></>;
  }, [customerInfo, getCustomerDetail, menuSelect.type]);

  const deleteCustomer = useCallback(async () => {
    try {
      if (customerId) {
        globalLoading.show();
        await CustomerService.deleteCustomer(customerId);
        showSuccessMessage('action_success_message', 'empty_string');
        goBack();
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [customerId]);

  const _handleDeleteProduct = useCallback(async () => {
    if (customerId) {
      Alert.alert(t('delete_confirm_title'), t('delete_confirm_desciption'), [
        {
          text: t('delete_rollback'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // On iOS, this makes the button appear as a cancel button
        },
        {
          text: t('delete_ok'),
          onPress: () => deleteCustomer(),
        },
      ]);
    }
  }, [deleteCustomer, customerId, t]);

  if (!customerId) return <Box />;

  return (
    <PageContainer>
      <AppHeader
        showBack
        title="customer_detail_title"
        rightContent={
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={_handleDeleteProduct}
          >
            <DeleteUser color={Colors.error} />
          </TouchableOpacity>
        }
      />
      <CustomerInfoMenuBar
        idSelect={menuSelect.id}
        onChange={value => setMenuSelect(value)}
      />
      <Box style={styles.container}>{renderContentInfo()}</Box>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
