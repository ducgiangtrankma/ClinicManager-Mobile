import {
  AppActivityIndicator,
  AppHeader,
  AppInput,
  AppList,
  Box,
  EmptyList,
  PageContainer,
} from '@src/components';
import { CustomerEntity } from '@src/models';

import { useFocusEffect } from '@react-navigation/native';
import { FilterIcon } from '@src/assets';
import { useCustomerListQuery } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import {
  CustomerFilter,
  CustomerFilterRef,
  CustomerFilterValue,
} from './components/CustomerFilter';
import { CustomerItem } from './components/CustomerItem';
import { CustomerItemSkeleton } from './components/CustomerSkeleton';
import { useTranslation } from 'react-i18next';

interface Props {}
export const CustomerHomeScreen: FC<Props> = () => {
  const { t } = useTranslation();
  const customerFilterRef = useRef<CustomerFilterRef>(null);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);

  const handleFilterChange = useCallback((filter: CustomerFilterValue) => {
    console.log('Filter changed:', filter);
    setFromDate(filter.fromDate);
    setToDate(filter.toDate);
  }, []);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCustomerListQuery(10, keyword, fromDate, toDate);

  const customers = data?.pages.flatMap(p => p.customers) ?? [];
  const renderItem = useCallback(
    ({ item, index }: { item: CustomerEntity; index: number }) => {
      return (
        <Animated.View
          entering={FadeInRight.springify()
            .damping(80)
            .stiffness(500)
            .delay(index * 30)}
          exiting={FadeOutLeft.springify().damping(80).stiffness(500)}
        >
          <CustomerItem item={item} />
        </Animated.View>
      );
    },
    [],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [refetch]),
  );

  return (
    <PageContainer>
      <AppHeader
        title="customer.home.title"
        showBack={false}
        rightContent={
          <TouchableOpacity
            onPress={() => customerFilterRef.current?.open({})}
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
      <Box
        style={{ marginHorizontal: sizes._16sdp, marginBottom: sizes._16sdp }}
      >
        <AppInput
          onChangeText={value => setKeyword(value)}
          placeholder={t('customer_search_placeholder')}
          clearButtonMode="while-editing"
        />
      </Box>
      {isLoading ? (
        <CustomerItemSkeleton count={6} />
      ) : (
        <AppList
          data={customers ?? []}
          renderItem={renderItem}
          canLoadMore={hasNextPage}
          canRefresh
          onLoadMore={handleLoadMore}
          onRefresh={handleRefresh}
          refreshing={isRefetching}
          keyExtractor={(item: CustomerEntity) => `${item?.id}`}
          ListFooterComponent={
            isFetchingNextPage ? (
              <AppActivityIndicator animating={isFetchingNextPage} />
            ) : null
          }
          ListEmptyComponent={<EmptyList description="customer_emptyList" />}
        />
      )}
      <CustomerFilter
        ref={customerFilterRef}
        onFilterChange={handleFilterChange}
      />
    </PageContainer>
  );
};
