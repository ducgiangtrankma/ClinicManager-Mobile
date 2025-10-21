import {
  AppHeader,
  AppText,
  PageContainer,
  YearPicker,
  YearPickerReft,
} from '@src/components';
import { useYearCustomerGrowthQuery } from '@src/services';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { YearGrowthChart } from './components/YearGrowthChart';

import { GrowthStoreChartData } from '@src/models';
import { createStoreChartData } from '@src/utils';
import { RefreshControl } from 'react-native-gesture-handler';
import { useAppTheme } from '@src/common';
interface Props {}
export const CustomerGrowthScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const now = new Date();

  const yearPickerRef: React.RefObject<YearPickerReft> = React.createRef<any>();
  const [year, setYear] = useState<string>(now.getFullYear().toString());

  const { data, refetch } = useYearCustomerGrowthQuery(year);

  useEffect(() => {
    if (year) {
      refetch();
    }
  }, [refetch, year]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const charData: GrowthStoreChartData[] = useMemo(() => {
    // Perform expensive calculation here
    if (data) return createStoreChartData(data ?? []);
    return [];
  }, [data]);

  return (
    <PageContainer style={styles.container}>
      <AppHeader title="report_growth_title" showBack={false} />
      <TouchableOpacity onPress={() => yearPickerRef.current.open()}>
        <AppText
          textAlign="center"
          fontFamily="content_bold"
          translationKey="year"
          fontSize="18"
          style={styles.year}
        >
          {year}
        </AppText>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={onRefresh}
            colors={[Colors.green]}
            tintColor={Colors.green}
          />
        }
      >
        {charData.map(item => (
          <YearGrowthChart
            key={item.storeId}
            chartData={item.chartData}
            storeName={item.storeName}
            totalNewCustomers={item.totalNewCustomers}
            useIndexLabel
          />
        ))}
      </ScrollView>
      <YearPicker
        ref={yearPickerRef}
        value={year}
        onChange={value => setYear(value)}
      />
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  year: { textDecorationLine: 'underline' },
});
