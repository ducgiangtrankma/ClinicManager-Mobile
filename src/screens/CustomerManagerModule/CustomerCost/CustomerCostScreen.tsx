import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppTheme } from '@src/common';
import {
  AppHeader,
  AppText,
  Box,
  globalLoading,
  PageContainer,
  showErrorMessage,
} from '@src/components';
import { CustomerCostEntity } from '@src/models';
import { APP_SCREEN, RootStackParamList } from '@src/navigator';
import { TreatmentService } from '@src/services';
import { formatMoney, sizes } from '@src/utils';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface Props {}
export const CustomerCostScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const route =
    useRoute<RouteProp<RootStackParamList, APP_SCREEN.CUSTOMER_COST>>();

  const customerId = route.params?.customerId;

  const [customerCost, setCustomerCost] = useState<CustomerCostEntity>();

  const getCost = useCallback(async () => {
    try {
      if (customerId) {
        globalLoading.show();
        const response = await TreatmentService.getCostAnalysis(customerId);
        setCustomerCost(response.data);
      }
    } catch (error: any) {
      showErrorMessage('error.title', error.message);
    } finally {
      globalLoading.hide();
    }
  }, [customerId]);

  useEffect(() => {
    getCost();
  }, [getCost]);

  if (!customerCost) return <Box />;
  return (
    <PageContainer style={styles.container}>
      <AppHeader title="customer_cost_title" showBack />
      {!customerId ? (
        <Box />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: sizes._16sdp,
            gap: sizes._16sdp,
          }}
        >
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_totalTreatmentFee"
            />
            <AppText fontSize="18">
              {formatMoney(customerCost?.summary.totalTreatmentFee)} vnđ
            </AppText>
          </Box>
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_totalRevenue"
            />
            <AppText fontSize="18">
              {formatMoney(customerCost?.summary.totalRevenue)} vnđ
            </AppText>
          </Box>
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_totalCost"
            />
            <AppText fontSize="18">
              {formatMoney(customerCost?.summary.totalCost)} vnđ
            </AppText>
          </Box>
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_totalProfit"
            />
            <AppText fontSize="18">
              {formatMoney(customerCost?.summary.totalProfit)} vnđ
            </AppText>
          </Box>
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_totalExpectedProfit"
            />
            <AppText fontSize="18">
              {formatMoney(customerCost?.summary.totalExpectedProfit)} vnđ
            </AppText>
          </Box>
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_averageProfitMargin"
            />
            <AppText fontSize="18">
              {customerCost?.summary.averageProfitMargin} %
            </AppText>
          </Box>
          <Box horizontal justify="space-between">
            <AppText
              fontSize="18"
              fontFamily="content_bold"
              translationKey="customer_cost_expectedAverageProfitMargin"
            />
            <AppText fontSize="18">
              {customerCost?.summary.expectedAverageProfitMargin} %
            </AppText>
          </Box>
          <Box
            style={[
              styles.divider,
              {
                backgroundColor: Colors.divider,
              },
            ]}
          />
          <AppText
            fontSize="18"
            fontFamily="content_bold"
            translationKey="customer_cost_detail"
          />
          {customerCost.treatments.map((treatment, index) => (
            <Box key={treatment.id} gap={sizes._8sdp}>
              <AppText fontSize="18">
                Buổi {index + 1}: {treatment.title}:
              </AppText>
              <Box horizontal justify="space-between">
                <AppText
                  fontSize="18"
                  translationKey="customer_cost_totalCost"
                />
                <AppText fontSize="18">
                  {formatMoney(treatment.cost)} vnđ
                </AppText>
              </Box>
              <Box
                style={[
                  styles.divider,
                  {
                    backgroundColor: Colors.divider,
                  },
                ]}
              />
            </Box>
          ))}
        </ScrollView>
      )}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: { height: sizes._1sdp, width: '100%' },
});
