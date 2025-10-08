import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
import {
  AppHeader,
  Box,
  PageContainer,
  showErrorMessage,
} from '@src/components';
import {
  CustomerDetailMenubarEntity,
  CustomerInfoMenuBar,
  MenuType,
} from '@src/components/CustomerInfoMenuBar';
import { TreatmentScreen } from '@src/screens/Treatment';
import { DEFAULT_HIT_SLOP } from '@src/utils';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomerDetailInfo } from './components/CustomerDetail-Info';
import { CustomerDetailInitialExaminationInfo } from './components/CustomerDetail-InitialExaminationInfo';
import { CustomerDetailPayment } from './components/CustomerDetail-Payment';
import { RouteProp, useRoute } from '@react-navigation/native';
import { APP_SCREEN, RootStackParamList } from '@src/navigator';
import { CustomerService } from '@src/services';
import { CustomerDetailEntity } from '@src/models';

interface Props {}
export const CustomerDetailScreen: FC<Props> = () => {
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
          onCreateSuccess={getCustomerDetail}
        />
      );
    if (menuSelect.type === MenuType.PAYMENT)
      return <CustomerDetailPayment customerInfo={customerInfo} />;
    return <></>;
  }, [customerInfo, getCustomerDetail, menuSelect.type]);

  if (!customerId) return <Box />;

  return (
    <PageContainer>
      <AppHeader
        showBack
        title="customer_detail_title"
        rightContent={
          <TouchableOpacity hitSlop={DEFAULT_HIT_SLOP}>
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
