// RevenueReportChart.tsx
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { formatMoney, sizes } from '@src/utils';

type StoreRevenue = {
  storeId: string;
  storeName: string;
  expectedRevenue: number;
  actualRevenue: number;
  totalDebt: number;
  totalCost: number;
  profit: number;
  profitMargin: string; // "70.40%"
};

type Props = {
  stores: StoreRevenue[];
  title?: string;
  /** rút gọn nhãn dưới trục X nếu tên dài */
  useIndexLabel?: boolean;
};

export const RevenueReportChart = memo(
  ({ stores, title = 'Báo cáo doanh thu', useIndexLabel = false }: Props) => {
    const { Colors } = useAppTheme();

    // Chuẩn hoá dữ liệu theo nhóm (grouped bars)
    const barGroups = useMemo(() => {
      return stores.map((s, idx) => ({
        label: useIndexLabel ? String(idx + 1) : s.storeName,
        bars: [
          {
            value: s.expectedRevenue,
            frontColor: Colors.grayBackground, // kế hoạch
            label: 'Kế hoạch',
            topLabelComponent: () => (
              <AppText style={{ fontSize: 10 }}>
                {formatMoney(s.expectedRevenue)}
              </AppText>
            ),
          },
          {
            value: s.actualRevenue,
            frontColor: Colors.green, // thực tế
            label: 'Thực tế',
            topLabelComponent: () => (
              <AppText style={{ fontSize: 10, color: Colors.green }}>
                {formatMoney(s.actualRevenue)}
              </AppText>
            ),
          },
        ],
        // Phụ chú dưới nhãn: biên lợi nhuận
        labelComponent: () => (
          <View style={{ alignItems: 'center', maxWidth: 120, paddingTop: 6 }}>
            <AppText
              numberOfLines={1}
              style={{ fontSize: sizes._12sdp, textAlign: 'center' }}
            >
              {useIndexLabel ? `#${idx + 1}` : s.storeName}
            </AppText>
            <AppText style={{ fontSize: 10, opacity: 0.7 }}>
              Lãi: {formatMoney(s.profit)} ({s.profitMargin})
            </AppText>
          </View>
        ),
      }));
    }, [stores, useIndexLabel, Colors]);

    // Tính max cho trục Y (đệm 10%)
    const maxY = useMemo(() => {
      const allVals = stores.flatMap(s => [s.expectedRevenue, s.actualRevenue]);
      const m = Math.max(0, ...allVals);
      return m <= 0 ? 1 : Math.ceil(m * 1.1);
    }, [stores]);

    return (
      <Box>
        <AppText fontFamily="content_bold" style={{ marginBottom: 6 }}>
          {title}
        </AppText>

        <BarChart
          barGroups={barGroups} // <— nhóm 2 cột/ cơ sở
          height={280}
          maxValue={maxY}
          noOfSections={5}
          yAxisTextStyle={{ fontSize: sizes._12sdp }}
          xAxisLabelTextStyle={{ fontSize: sizes._12sdp }}
          yAxisThickness={1}
          xAxisThickness={1}
          rulesType="solid"
          rulesColor="#E5E7EB"
          barWidth={22}
          spacing={28} // khoảng cách giữa các nhóm
          barBorderRadius={6}
          showYAxisIndices
          isAnimated
          animationDuration={600}
          // legend đơn giản
          showLegend
          legendBarHeight={10}
          legendThickness={10}
          legendLabelStyle={{ fontSize: 12 }}
          legends={[
            { label: 'Kế hoạch', color: Colors.grayBackground },
            { label: 'Thực tế', color: Colors.green },
          ]}
        />
      </Box>
    );
  },
);
