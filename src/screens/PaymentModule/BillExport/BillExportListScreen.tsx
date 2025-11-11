import {
  AppActivityIndicator,
  AppHeader,
  AppList,
  AppText,
  Box,
  EmptyList,
  PageContainer,
} from '@src/components';
import { BillExportEntity } from '@src/models';
import { useBillExportListQuery } from '@src/services';
import React, { FC, useCallback, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BillExportItem } from './components/BillExportItem';
import { formatMoney, sizes } from '@src/utils';
import { useAppTheme } from '@src/common';
import { FilterIcon } from '@src/assets';
import {
  BillFilter,
  BillFilterRef,
  BillFilterValue,
} from './components/BillFilter';

interface Props {}
export const BillExportListScreen: FC<Props> = () => {
  const billFilterRef = useRef<BillFilterRef>(null);
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);
  const { Colors } = useAppTheme();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useBillExportListQuery(10, { fromDate, toDate });

  const renderItem = useCallback(({ item }: { item: BillExportEntity }) => {
    return <BillExportItem bill={item} />;
  }, []);

  const bills = data?.pages.flatMap(p => p.bills) ?? [];
  const summary = data?.pages?.[0]?.summary;
  console.log('summary', summary);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleFilterChange = useCallback((filter: BillFilterValue) => {
    console.log('Filter changed:', filter);
    setFromDate(filter.fromDate);
    setToDate(filter.toDate);
  }, []);

  return (
    <PageContainer disablePaddingBottom>
      <AppHeader
        title="bill_export_title"
        showBack={false}
        rightContent={
          <TouchableOpacity
            onPress={() => billFilterRef.current?.open({})}
            hitSlop={{
              top: sizes._12sdp,
              bottom: sizes._12sdp,
              left: sizes._12sdp,
              right: sizes._12sdp,
            }}
          >
            <FilterIcon />
          </TouchableOpacity>
        }
      />
      {summary && (
        <Box>
          <Box
            align="center"
            horizontal
            gap={sizes._6sdp}
            style={{ marginRight: sizes._16sdp }}
            justify="flex-end"
          >
            <AppText>Tổng tiền chưa nhận:</AppText>
            <AppText
              color={Colors.green}
              fontFamily="content_bold"
              fontSize="18"
            >
              {formatMoney(summary.totalPendingAmount)} vnđ
            </AppText>
          </Box>
        </Box>
      )}
      <AppText
        fontFamily="content_bold"
        margin={{ ml: sizes._16sdp, mt: sizes._16sdp, mb: sizes._16sdp }}
      >
        Danh sách chi tiết:
      </AppText>
      <Box style={styles.container}>
        <AppList
          data={bills ?? []}
          renderItem={renderItem}
          canLoadMore={hasNextPage}
          canRefresh
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
          keyExtractor={(item: BillExportEntity) => `${item?.id}`}
          ListFooterComponent={
            isFetchingNextPage ? (
              <AppActivityIndicator animating={isFetchingNextPage} />
            ) : null
          }
          ListEmptyComponent={
            isLoading ? (
              <AppActivityIndicator animating={isLoading} />
            ) : (
              <EmptyList description="bill_empty" />
            )
          }
        />
      </Box>
      <BillFilter ref={billFilterRef} onFilterChange={handleFilterChange} />
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
