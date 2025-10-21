// RevenueReportChart.tsx
import { useAppTheme } from '@src/common';
import { AppText, Box } from '@src/components';
import { _screen_height, sizes } from '@src/utils';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { RevenueStoreEntity } from '@src/models';

type Props = {
  stores: RevenueStoreEntity[];
  /** rút gọn nhãn dưới trục X nếu tên dài */
  useIndexLabel?: boolean;
};

// Format số ngắn gọn (ví dụ: 1.5 tỉ, 177tr, 10k)
const formatShortMoney = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} tỉ`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}tr`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`;
  }
  return value.toString();
};

// Component cho label dưới cột
const BarLabel = memo(({ storeName }: { storeName: string }) => (
  <View style={styles.labelContainer}>
    <AppText
      fontSize="14"
      fontFamily="content_bold"
      textAlign="center"
      numberOfLines={3}
    >
      {storeName}
    </AppText>
  </View>
));

// Component cho giá trị trên cột
const TopLabel = memo(({ value, color }: { value: number; color?: string }) => (
  <AppText
    fontSize="12"
    fontFamily="content_semibold"
    style={[styles.topLabel, color ? { color } : undefined]}
  >
    {formatShortMoney(value)}
  </AppText>
));

// Factory functions để tránh tạo component mới mỗi lần render
const createTopLabelComponent = (value: number, color?: string) => {
  const TopLabelWrapper = () => <TopLabel value={value} color={color} />;
  return TopLabelWrapper;
};

const createBarLabelComponent = (label: string) => {
  const BarLabelWrapper = () => <BarLabel storeName={label} />;
  return BarLabelWrapper;
};

export const RevenueReportChart = memo(
  ({ stores, useIndexLabel = false }: Props) => {
    const { Colors } = useAppTheme();

    // Chuẩn hoá dữ liệu cho BarChart
    // Tạo dữ liệu xen kẽ: kế hoạch (có label), thực tế, spacing
    const barData = useMemo(() => {
      const data: any[] = [];

      stores.forEach((store, idx) => {
        const label = useIndexLabel ? String(idx + 1) : store.storeName;

        // Bar kế hoạch (gán label ở đây)
        data.push({
          value: store.expectedRevenue,
          frontColor: Colors.grayBackground,
          label: '',
          topLabelComponent: createTopLabelComponent(store.expectedRevenue),
          labelComponent: createBarLabelComponent(label),
        });

        // Bar thực tế (cạnh nhau với kế hoạch)
        data.push({
          value: store.actualRevenue,
          frontColor: Colors.green,
          label: '',
          topLabelComponent: createTopLabelComponent(
            store.actualRevenue,
            Colors.green,
          ),
        });

        // Thêm spacing giữa các nhóm (trừ nhóm cuối)
        if (idx < stores.length - 1) {
          data.push({
            value: 0,
            frontColor: 'transparent',
            label: '',
          });
        }
      });

      return data;
    }, [stores, useIndexLabel, Colors]);

    // Tính max cho trục Y (đệm 10%)
    const maxY = useMemo(() => {
      const allVals = stores.flatMap(s => [s.expectedRevenue, s.actualRevenue]);
      const m = Math.max(0, ...allVals);
      return m <= 0 ? 1 : Math.ceil(m * 1.1);
    }, [stores]);

    return (
      <Box style={styles.container}>
        <BarChart
          data={barData}
          height={_screen_height * 0.35}
          maxValue={maxY}
          noOfSections={5}
          yAxisTextStyle={styles.yAxisText}
          xAxisLabelTextStyle={styles.xAxisText}
          yAxisThickness={1}
          xAxisThickness={1}
          rulesType="solid"
          rulesColor="#E5E7EB"
          barWidth={sizes._36sdp}
          spacing={sizes._12sdp}
          barBorderRadius={sizes._8sdp}
          showYAxisIndices
          isAnimated
          animationDuration={600}
          hideRules={false}
          xAxisColor="#D1D5DB"
          yAxisColor="#D1D5DB"
          yAxisLabelWidth={sizes._48sdp}
          initialSpacing={sizes._24sdp}
          endSpacing={sizes._24sdp}
          formatYLabel={(value: string) => formatShortMoney(Number(value))}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendBox,
                { backgroundColor: Colors.grayBackground },
              ]}
            />
            <AppText
              translationKey="expectedRevenue"
              fontSize="14"
              fontFamily="content_medium"
            />
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendBox, { backgroundColor: Colors.green }]}
            />
            <AppText
              translationKey="actualRevenue"
              fontSize="14"
              fontFamily="content_medium"
            />
          </View>
        </View>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sizes._16sdp,
    paddingVertical: sizes._12sdp,
  },
  titleText: {
    marginBottom: sizes._16sdp,
  },
  labelContainer: {
    alignItems: 'center',
    width: sizes._96sdp,
    minHeight: sizes._120sdp,
  },

  profitText: {
    marginTop: sizes._2sdp,
  },
  profitMarginText: {
    textAlign: 'center',
    opacity: 0.6,
  },
  topLabel: {
    textAlign: 'center',
    marginBottom: sizes._4sdp,
  },
  yAxisText: {
    fontSize: sizes._11sdp,
    color: '#6B7280',
  },
  xAxisText: {
    fontSize: sizes._10sdp,
    color: '#6B7280',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: sizes._24sdp,
    marginTop: sizes._48sdp,
    paddingTop: sizes._16sdp,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: sizes._12sdp,
  },
  legendBox: {
    width: sizes._18sdp,
    height: sizes._18sdp,
    borderRadius: sizes._6sdp,
  },
});
