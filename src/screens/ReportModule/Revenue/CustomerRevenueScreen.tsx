import { PageContainer } from '@src/components';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { RevenueReportChart } from './components/RevenuChart';

interface Props {}
const stores = [
  {
    storeId: '68df4287c0f6bd1a7ca0d68c',
    storeName: 'Desi cosmetic Hữu Lũng - Cơ sở 1',
    expectedRevenue: 177079000,
    actualRevenue: 170979000,
    totalDebt: 6100000,
    totalCost: 50603690,
    profit: 120375310,
    profitMargin: '70.40%',
  },
  {
    storeId: '68df42a3c0f6bd1a7ca0d692',
    storeName: 'Desi cosmetic Hữu Lũng - Cơ sở 2',
    expectedRevenue: 0,
    actualRevenue: 0,
    totalDebt: 0,
    totalCost: 0,
    profit: 0,
    profitMargin: '0.00%',
  },
];

export const CustomerRevenueScreen: FC<Props> = () => {
  return (
    <PageContainer style={styles.container}>
      <RevenueReportChart stores={stores} title="Doanh thu theo cơ sở" />;
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
