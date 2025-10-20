import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { GrowthChartPoint } from '@src/models';
import { _screen_height, sizes } from '@src/utils';
import React, { memo, useMemo } from 'react';
import { LineChart } from 'react-native-gifted-charts';

interface Props {
  chartData: GrowthChartPoint[];
  storeName: string;
  totalNewCustomers: number;
  /** Nếu true thì dùng index (1, 2, 3, ...) thay vì label */
  useIndexLabel?: boolean;
}

export const YearGrowthChart = memo(
  ({
    chartData,
    storeName,
    totalNewCustomers,
    useIndexLabel = false,
  }: Props) => {
    const { Colors } = useAppTheme();

    const data = useMemo(() => {
      if (!chartData?.length) return [];
      return chartData.map((item, idx) => ({
        value: item.value,
        label: useIndexLabel ? String(idx + 1) : item.label,
        dataPointText: item.dataPointText,
      }));
    }, [chartData, useIndexLabel]);

    const maxVal = useMemo(() => {
      const m = Math.max(...data.map(d => d.value), 0);
      return m <= 0 ? 10 : Math.ceil(m * 1.1);
    }, [data]);

    return (
      <Box style={{ padding: sizes._16sdp }}>
        <AppText fontFamily="content_bold">{storeName}</AppText>
        <Box horizontal align="center" style={{ marginVertical: sizes._16sdp }}>
          <AppText translationKey="totalNewCustomers" />
          <AppText fontFamily="content_bold" color={Colors.green}>
            {' '}
            {totalNewCustomers ?? 0}
          </AppText>
        </Box>

        <LineChart
          data={data}
          height={_screen_height * 0.25}
          maxValue={maxVal}
          noOfSections={5}
          curved
          areaChart
          // Hiển thị dot & text
          hideDataPoints={false}
          //   showDataPointText
          dataPointsHeight={6}
          dataPointsWidth={6}
          dataPointsColor={Colors.red}
          textColor="#111827"
          textFontSize={10}
          textShiftY={-10}
          // Màu line
          thickness={3}
          color={Colors.green}
          startFillColor={Colors.green}
          endFillColor={Colors.green}
          startOpacity={1}
          endOpacity={0.2}
          // Trục
          yAxisThickness={1}
          xAxisThickness={1}
          xAxisLabelTextStyle={{ fontSize: sizes._11sdp }}
          yAxisTextStyle={{ fontSize: sizes._11sdp }}
          rulesType="solid"
          rulesColor="#E5E7EB"
          spacing={26}
        />
      </Box>
    );
  },
);
