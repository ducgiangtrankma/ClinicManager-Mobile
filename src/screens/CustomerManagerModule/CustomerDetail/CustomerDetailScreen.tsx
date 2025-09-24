import { AppHeader, Box, PageContainer } from '@src/components';
import {
  CustomerDetailMenubarEntity,
  CustomerInfoMenuBar,
  MenuType,
} from '@src/components/CustomerInfoMenuBar';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomerDetailInfo } from './components/CustomerDetail-Info';
import { CustomerDetailInitialExaminationInfo } from './components/CustomerDetail-InitialExaminationInfo';
import { CustomerDetailPayment } from './components/CustomerDetail-Payment';
import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
import { DEFAULT_HIT_SLOP } from '@src/utils';
import { TreatmentScreen } from '@src/screens/Treatment';

interface Props {}
export const CustomerDetailScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const [menuSelect, setMenuSelect] = useState<CustomerDetailMenubarEntity>({
    id: '1',
    name: 'customer_detail_menu_1',
    queryParam: '',
    type: MenuType.INFO,
  });

  const renderContentInfo = useCallback(() => {
    if (menuSelect.type === MenuType.INFO) return <CustomerDetailInfo />;
    if (menuSelect.type === MenuType.INITIAL_EXAMINATION_INFORMATION)
      return <CustomerDetailInitialExaminationInfo />;
    if (menuSelect.type === MenuType.TREATMENT) return <TreatmentScreen />;
    if (menuSelect.type === MenuType.PAYMENT) return <CustomerDetailPayment />;
    return <></>;
  }, [menuSelect.type]);
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
