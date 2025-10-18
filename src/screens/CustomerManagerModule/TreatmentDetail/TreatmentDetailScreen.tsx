import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import {
  AppHeader,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
  TreatmentDetailMenubarEntity,
  TreatmentMenuBar,
  TreatmentMenuType,
} from '@src/components';
import { TreatmentDetailEntity } from '@src/models';
import { APP_SCREEN, goBack, RootStackParamList } from '@src/navigator';
import { TreatmentService } from '@src/services';
import { DEFAULT_HIT_SLOP, deleteEvent, sizes } from '@src/utils';
import React, { FC, useCallback, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { TreatmentInfo } from './components/TreatmentInfo';
import { TreatmentPayment } from './components/TreatmentPayment';
import { DeleteUser } from '@src/assets';
import { useAppTheme } from '@src/common';
import { useTranslation } from 'react-i18next';
interface Props {}
export const TreatmentDetailScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const { t } = useTranslation();
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

  const deleteTreatment = useCallback(async () => {
    try {
      if (treatment?.id) {
        globalLoading.show();
        await TreatmentService.deleteTreatment(treatment?.id);
        if (treatment.eventId) {
          await deleteEvent(treatment.eventId);
        }
        goBack();
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [treatment]);

  const _handleDeleteTreatment = useCallback(async () => {
    if (treatment) {
      Alert.alert(t('delete_confirm_title'), t('delete_confirm_desciption'), [
        {
          text: t('delete_rollback'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // On iOS, this makes the button appear as a cancel button
        },
        {
          text: t('delete_ok'),
          onPress: () => deleteTreatment(),
        },
      ]);
    }
  }, [treatment, t, deleteTreatment]);

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
      <AppHeader
        title="treatment_detail_header"
        showBack
        rightContent={
          <TouchableOpacity
            hitSlop={DEFAULT_HIT_SLOP}
            onPress={_handleDeleteTreatment}
          >
            <DeleteUser color={Colors.error} />
          </TouchableOpacity>
        }
      />
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
