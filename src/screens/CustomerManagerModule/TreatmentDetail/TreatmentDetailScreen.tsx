import { RouteProp, useRoute } from '@react-navigation/native';
import {
  AppHeader,
  Box,
  PageContainer,
  TreatmentDetailMenubarEntity,
  TreatmentMenuBar,
  TreatmentMenuType,
} from '@src/components';
import { APP_SCREEN, RootStackParamList } from '@src/navigator';
import React, { FC, useState } from 'react';
import { TreatmentInfo } from './components/TreatmentInfo';
import { TreatmentPayment } from './components/TreatmentPayment';
import { StyleSheet } from 'react-native';
import { sizes } from '@src/utils';
interface Props {}
export const TreatmentDetailScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.TREATMENT_DETAIL>>();
  const treatment = route?.params?.treatment;
  const [menuSelect, setMenuSelect] = useState<TreatmentDetailMenubarEntity>({
    id: '1',
    name: 'customer_detail_menu_1',
    type: TreatmentMenuType.INFO,
  });

  if (!treatment) return <></>;
  const renderContent = () => {
    if (menuSelect.type === TreatmentMenuType.INFO)
      return <TreatmentInfo treatment={treatment} />;
    if (menuSelect.type === TreatmentMenuType.PAYMENT)
      return <TreatmentPayment treatment={treatment} />;
    return <></>;
  };
  if (!treatment) return <></>;

  return (
    <PageContainer>
      <AppHeader title="treatment_detail_header" showBack />
      <TreatmentMenuBar
        idSelect={menuSelect.id}
        onChange={value => setMenuSelect(value)}
      />
      <Box style={styles.container}>{renderContent()}</Box>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: sizes._24sdp,
  },
});
