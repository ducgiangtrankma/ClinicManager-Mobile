import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import {
  AppHeader,
  Box,
  PageContainer,
  showErrorMessage,
  TreatmentDetailMenubarEntity,
  TreatmentMenuBar,
  TreatmentMenuType,
} from '@src/components';
import { TreatmentDetailEntity } from '@src/models';
import { APP_SCREEN, RootStackParamList } from '@src/navigator';
import { TreatmentService } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TreatmentInfo } from './components/TreatmentInfo';
import { TreatmentPayment } from './components/TreatmentPayment';
interface Props {}
export const TreatmentDetailScreen: FC<Props> = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.TREATMENT_DETAIL>>();
  const treatmentId = route?.params?.treatmentId;
  const [treatment, setTreatment] = useState<TreatmentDetailEntity>();
  const [menuSelect, setMenuSelect] = useState<TreatmentDetailMenubarEntity>({
    id: '1',
    name: 'customer_detail_menu_1',
    type: TreatmentMenuType.INFO,
  });

  const getTreatmentDetail = useCallback(async () => {
    try {
      if (treatmentId) {
        const response = await TreatmentService.getTreatmentDetail(treatmentId);
        setTreatment(response.data);
      }
    } catch (error: any) {
      console.log('error', error);
      showErrorMessage('error.title', error.message);
    }
  }, [treatmentId]);

  useFocusEffect(
    React.useCallback(() => {
      getTreatmentDetail();
      return () => {};
    }, [getTreatmentDetail]),
  );

  if (!treatment) return <></>;
  const renderContent = () => {
    if (!treatment) return <Box />;
    if (menuSelect.type === TreatmentMenuType.INFO)
      return (
        <TreatmentInfo
          treatment={treatment}
          onUpdateSuccess={getTreatmentDetail}
        />
      );
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
