import {
  AppActivityIndicator,
  AppHeader,
  AppList,
  EmptyList,
  PageContainer,
} from '@src/components';
import { CustomerEntity, customersDummy } from '@src/models';

import { FilterIcon } from '@src/assets';
import { useCustomerQuery } from '@src/services';
import { sizes } from '@src/utils';
import React, { FC, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { CustomerItem } from './components/CustomerItem';

interface Props {}
export const CustomerHomeScreen: FC<Props> = () => {
  const {
    data,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCustomerQuery(10);

  const customers = data?.pages.flatMap(p => p.customers) ?? customersDummy;
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

  console.log('isFetching', isFetching);

  return (
    <PageContainer>
      <AppHeader
        title="customer.home.title"
        showBack={false}
        rightContent={
          <TouchableOpacity
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
      {/* {isFetching ? (
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
      )} */}
    </PageContainer>
  );
};
