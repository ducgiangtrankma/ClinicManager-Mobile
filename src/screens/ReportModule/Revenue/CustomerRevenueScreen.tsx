import {
  AppHeader,
  AppSelectForm,
  Box,
  DateTimePicker,
  DateTimePickerReft,
  PageContainer,
} from '@src/components';
import { useRevenueQuery } from '@src/services/queries/useRevenueQueries';
import { getMonthRange, sizes } from '@src/utils';
import dayjs from 'dayjs';
import React, { FC, useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DetailRevenue } from './components/DetailRevenue';
import { RevenueReportChart } from './components/RevenuChart';
import { SummaryContent } from './components/SummaryContent';
import { RefreshControl } from 'react-native-gesture-handler';
import { useAppTheme } from '@src/common';
interface Props {}

export const CustomerRevenueScreen: FC<Props> = () => {
  const { Colors } = useAppTheme();
  const { startDate, endDate } = getMonthRange();
  const startDatetimePickerRef = useRef<DateTimePickerReft>(null);
  const endDatetimePickerRef = useRef<DateTimePickerReft>(null);
  const [startDateValue, setStartDateValue] = useState<string>(startDate);
  const [endDateValue, setEndDateValue] = useState<string>(endDate);

  const { data, refetch } = useRevenueQuery(startDateValue, endDateValue);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <PageContainer style={styles.container}>
      <AppHeader title="report_revenue" showBack={false} />
      <Box
        horizontal
        gap={sizes._16sdp}
        style={{ marginHorizontal: sizes._24sdp, marginBottom: sizes._16sdp }}
      >
        <Box style={styles.container}>
          <AppSelectForm
            onPress={() => startDatetimePickerRef.current?.open()}
            placeholder="customer_filter_select_date"
            errMessage={''}
            value={
              startDateValue
                ? {
                    id: startDateValue,
                    value: startDateValue,
                    label: dayjs(startDateValue).format('DD/MM/YYYY'),
                  }
                : undefined
            }
          />
        </Box>
        <Box style={styles.container}>
          <AppSelectForm
            onPress={() => endDatetimePickerRef.current?.open()}
            placeholder="customer_filter_select_date"
            errMessage={''}
            value={
              endDateValue
                ? {
                    id: endDateValue,
                    value: endDateValue,
                    label: dayjs(endDateValue).format('DD/MM/YYYY'),
                  }
                : undefined
            }
          />
        </Box>
      </Box>
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
        <Box style={{ paddingHorizontal: sizes._24sdp, gap: sizes._8sdp }}>
          <SummaryContent
            title="totalExpectedRevenue"
            value={data?.summary.totalExpectedRevenue ?? 0}
          />
          <SummaryContent
            title="totalActualRevenue"
            value={data?.summary.totalActualRevenue ?? 0}
          />
          <SummaryContent
            title="averageProfitMargin"
            value={data?.summary.averageProfitMargin ?? 0}
          />
        </Box>
        <RevenueReportChart stores={data?.stores ?? []} />;
        <Box
          style={{
            paddingHorizontal: sizes._24sdp,
            gap: sizes._8sdp,
            marginTop: sizes._16sdp,
          }}
        >
          {data?.stores.map(e => (
            <DetailRevenue key={e.storeId} store={e} />
          ))}
        </Box>
      </ScrollView>
      <DateTimePicker
        ref={startDatetimePickerRef}
        value={startDateValue || dayjs().format('YYYY-MM-DD')}
        onChange={date => setStartDateValue(date)}
      />
      <DateTimePicker
        ref={endDatetimePickerRef}
        value={endDateValue || dayjs().format('YYYY-MM-DD')}
        onChange={date => setEndDateValue(date)}
      />
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
